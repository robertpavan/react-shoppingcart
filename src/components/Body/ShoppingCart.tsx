import { CartItem } from "../../types";
import { Minus, Plus, X } from "lucide-react";

export function ShoppingCart({
  cart,
  clearCart,
  decreaseStock,
  updateQuantity,
  removeFromCart,
  subtotal,
  tax,
  total,
}: {
  cart: CartItem[];
  clearCart: () => void;
  decreaseStock: (partId: number, delta: number) => void;
  updateQuantity: (partId: number, delta: number) => void;
  removeFromCart: (partId: number) => void;
  subtotal: number;
  tax: number;
  total: number;
}) {
  // clear shopping cart, decrease stock by quantity sold
  function makeSale() {
    clearCart();
    cart.forEach((cartItem) => {
      decreaseStock(cartItem.part.id, cartItem.quantity);
    });
  }

  return (
    <div className="lg:col-span-3">
      <div className="shopping-cart">
        <div className="p-6">
          <h2 className="cart-title mb-4">Shopping Cart</h2>
          {cart.length === 0 ? (
            <p className="text-gray-500 text-center py-6">Your cart is empty</p>
          ) : (
            <>
              <div className="space-y-4 mb-6">
                {cart.map((item) => (
                  <div key={item.part.id} className="cart-item flex p-4">
                    <div className="flex-grow">
                      <h3 className="font-medium">{item.part.name}</h3>
                      <p className="text-sm text-gray-600">
                        ${item.part.price.toFixed(2)} each
                      </p>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => updateQuantity(item.part.id, -1)}
                          className="p-1 hover:bg-gray-100 rounded"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.part.id, 1)}
                          className="p-1 hover:bg-gray-100 rounded"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.part.id)}
                        className="p-1 text-red-600 hover:bg-red-50 rounded"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="border-t pt-4 space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Tax (13%)</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-bold text-lg pt-2 border-t">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <button
                  className="w-full mt-4 bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors"
                  onClick={() => makeSale()}
                >
                  Checkout
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
