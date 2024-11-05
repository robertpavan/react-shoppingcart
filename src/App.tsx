import { useState } from "react";
import { Monitor, Cpu, HardDrive, CircuitBoard } from "lucide-react";
import { Header } from "./components/Header";
import { CartItem, Part } from "./types";
import { Body } from "./components/Body";

const PARTS_FOR_SALE: Part[] = [
  {
    id: 1,
    name: "AMD Ryzen 9 5950X",
    price: 549.99,
    description: "16-core, 32-thread processor",
    icon: <Cpu className="w-8 h-8" />,
    specs: "4.9 GHz Max Boost, 72MB Cache",
    stock: 10,
  },
  {
    id: 2,
    name: "NVIDIA RTX 4080",
    price: 1199.99,
    description: "High-end graphics card",
    icon: <CircuitBoard className="w-8 h-8" />,
    specs: "16GB GDDR6X, DLSS 3.0",
    stock: 5,
  },
  {
    id: 3,
    name: "Samsung 990 PRO 2TB",
    price: 169.99,
    description: "NVMe M.2 SSD",
    icon: <HardDrive className="w-8 h-8" />,
    specs: "7,450 MB/s Read, PCIe 4.0",
    stock: 50,
  },
  {
    id: 4,
    name: "LG 27GP950-B",
    price: 799.99,
    description: "4K Gaming Monitor",
    icon: <Monitor className="w-8 h-8" />,
    specs: '27" 4K UHD, 144Hz, 1ms',
    stock: 20,
  },
];

function App() {
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
  const TAX_RATE = 0.13;
  const tax = subtotal * TAX_RATE;
  const total = subtotal + tax;

  return (
    <div className="min-h-screen">
      <Header>
        <p>I'm a child</p>
      </Header>

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
    </div>
  );
}

export default App;
