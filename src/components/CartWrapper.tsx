import { useState } from "react";
import { PARTS_FOR_SALE, TAX_RATE } from "../constants";
import { Part, CartItem } from "../types";
import { Body } from "./Body";

export function CartWrapper() {
  const [parts, setParts] = useState<Part[]>(PARTS_FOR_SALE);

  const [cart, setCart] = useState<CartItem[]>([]);

  const clearCart = () => setCart([]);

  const decreaseStock = (partId: number, delta: number) => {
    setParts((currentParts) => {
      return currentParts.map((item) => {
        if (item.id === partId) {
          const newStockAmount = Math.max(0, item.stock - delta);
          return { ...item, stock: newStockAmount };
        }
        return item;
      });
    });
  };

  const addToCart = (part: Part) => {
    setCart((currentCart) => {
      const existingItem = currentCart.find((item) => item.part.id === part.id);
      // if the part has 0 stock, or already all in the cart, do nothing
      if (part.stock === 0 || part.stock - (existingItem?.quantity ?? 0) <= 0) {
        return currentCart;
      }
      if (existingItem) {
        return currentCart.map((item) =>
          item.part.id === part.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...currentCart, { part, quantity: 1 }];
    });
  };

  const updateQuantity = (partId: number, delta: number) => {
    setCart((currentCart) => {
      return currentCart.map((item) => {
        if (item.part.id === partId) {
          const partInStock = parts.find((part) => part.id === partId);
          if (partInStock && item.quantity + delta > partInStock.stock) {
            return item; // Do nothing if adding would exceed stock
          }
          const newQuantity = Math.max(1, item.quantity + delta);
          return { ...item, quantity: newQuantity };
        }
        return item;
      });
    });
  };

  const removeFromCart = (partId: number) => {
    setCart((currentCart) =>
      currentCart.filter((item) => item.part.id !== partId)
    );
  };

  const subtotal = cart.reduce(
    (sum, item) => sum + item.part.price * item.quantity,
    0
  );
  const tax = subtotal * TAX_RATE;
  const total = subtotal + tax;

  return (
    <Body
      parts={parts}
      clearCart={clearCart}
      decreaseStock={decreaseStock}
      addToCart={addToCart}
      cart={cart}
      updateQuantity={updateQuantity}
      removeFromCart={removeFromCart}
      subtotal={subtotal}
      tax={tax}
      total={total}
    />
  );
}
