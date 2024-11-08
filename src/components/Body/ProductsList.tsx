import { CartItem, Part } from "../../types";

export function ProductsList({
  parts,
  addToCart,
  cart,
}: {
  parts: Part[];
  addToCart: (part: Part) => void;
  cart: CartItem[];
}) {
  return (
    <div className="lg:col-span-4 px-4">
      <div className="available-parts">
        <div className="px-2">
          <h2 className="parts-title mb-4">Available Parts</h2>
          <div className="space-y-6">
            {parts.map((part) => {
              // disable the button if...
              // - stock is zero
              const isStockZero = part.stock === 0;
              // - stock minus num in cart is zero
              const cartQuantity =
                cart.find((item) => {
                  return item.part.id === part.id;
                })?.quantity ?? 0;
              const isStockMinusNumInCartZero = part.stock - cartQuantity === 0;
              const isDisabled = isStockZero || isStockMinusNumInCartZero;

              return (
                <div key={part.id} className="part-item flex p-4">
                  <div className="flex-shrink-0 p-2 bg-blue-50 rounded-lg">
                    {part.icon}
                  </div>
                  <div className="ml-4 flex-grow">
                    <h3 className="text-lg font-medium">{part.name}</h3>
                    <p className="text-gray-600">{part.description}</p>
                    <p className="text-sm text-gray-500 mt-1">{part.specs}</p>
                    <p className="text-sm text-gray-500 mt-1">
                      In Stock: {part.stock.toFixed(0)}
                    </p>
                    <div className="mt-2 flex items-center justify-between">
                      <span className="text-xl font-bold">
                        ${part.price.toFixed(2)}
                      </span>
                      <button
                        onClick={() => addToCart(part)}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                        disabled={isDisabled}
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
