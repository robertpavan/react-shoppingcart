import { Part, CartItem } from "../types";
import "./body.css";
import { ProductsList } from "./Body/ProductsList";
import { ShoppingCart } from "./Body/Cart";

export function Body({
  parts,
  clearCart,
  decreaseStock,
  addToCart,
  cart,
  updateQuantity,
  removeFromCart,
  subtotal,
  tax,
  total,
}: {
  parts: Part[];
  clearCart: () => void;
  decreaseStock: (partId: number, delta: number) => void;
  addToCart: (part: Part) => void;
  cart: CartItem[];
  updateQuantity: (partId: number, delta: number) => void;
  removeFromCart: (partId: number) => void;
  subtotal: number;
  tax: number;
  total: number;
}) {
  return (
    <main className="max-w-7xl mx-auto py-10">
      <div className="grid grid-cols-1 lg:grid-cols-7 gap-10">
        {/* Parts List */}
        <ProductsList parts={parts} addToCart={addToCart} cart={cart} />

        {/* Shopping Cart */}
        <ShoppingCart
          cart={cart}
          clearCart={clearCart}
          decreaseStock={decreaseStock}
          updateQuantity={updateQuantity}
          removeFromCart={removeFromCart}
          subtotal={subtotal}
          tax={tax}
          total={total}
        />
      </div>
    </main>
  );
}
