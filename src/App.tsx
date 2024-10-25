import React, { useState } from 'react';
import {
  Monitor,
  Cpu,
  HardDrive,
  CircuitBoard,
  X,
  Plus,
  Minus,
} from 'lucide-react';

interface Part {
  id: number;
  name: string;
  price: number;
  description: string;
  icon: React.ReactNode;
  specs: string;
}

interface CartItem {
  part: Part;
  quantity: number;
}

const parts: Part[] = [
  {
    id: 1,
    name: 'AMD Ryzen 9 5950X',
    price: 549.99,
    description: '16-core, 32-thread processor',
    icon: <Cpu className="w-8 h-8" />,
    specs: '4.9 GHz Max Boost, 72MB Cache',
  },
  {
    id: 2,
    name: 'NVIDIA RTX 4080',
    price: 1199.99,
    description: 'High-end graphics card',
    icon: <CircuitBoard className="w-8 h-8" />,
    specs: '16GB GDDR6X, DLSS 3.0',
  },
  {
    id: 3,
    name: 'Samsung 990 PRO 2TB',
    price: 169.99,
    description: 'NVMe M.2 SSD',
    icon: <HardDrive className="w-8 h-8" />,
    specs: '7,450 MB/s Read, PCIe 4.0',
  },
  {
    id: 4,
    name: 'LG 27GP950-B',
    price: 799.99,
    description: '4K Gaming Monitor',
    icon: <Monitor className="w-8 h-8" />,
    specs: '27" 4K UHD, 144Hz, 1ms',
  },
];

function App() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const TAX_RATE = 0.085;

  const addToCart = (part: Part) => {
    setCart((currentCart) => {
      const existingItem = currentCart.find((item) => item.part.id === part.id);
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

  const removeFromCart = (partId: number) => {
    setCart((currentCart) =>
      currentCart.filter((item) => item.part.id !== partId)
    );
  };

  const updateQuantity = (partId: number, delta: number) => {
    setCart((currentCart) => {
      return currentCart.map((item) => {
        if (item.part.id === partId) {
          const newQuantity = Math.max(1, item.quantity + delta);
          return { ...item, quantity: newQuantity };
        }
        return item;
      });
    });
  };

  const subtotal = cart.reduce(
    (sum, item) => sum + item.part.price * item.quantity,
    0
  );
  const tax = subtotal * TAX_RATE;
  const total = subtotal + tax;

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-gray-900">
            Computer Parts Store
          </h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Parts List */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow">
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-4">Available Parts</h2>
                <div className="space-y-6">
                  {parts.map((part) => (
                    <div
                      key={part.id}
                      className="flex items-start p-4 border rounded-lg hover:shadow-md transition-shadow"
                    >
                      <div className="flex-shrink-0 p-2 bg-blue-50 rounded-lg">
                        {part.icon}
                      </div>
                      <div className="ml-4 flex-grow">
                        <h3 className="text-lg font-medium">{part.name}</h3>
                        <p className="text-gray-600">{part.description}</p>
                        <p className="text-sm text-gray-500 mt-1">
                          {part.specs}
                        </p>
                        <div className="mt-2 flex items-center justify-between">
                          <span className="text-xl font-bold">
                            ${part.price.toFixed(2)}
                          </span>
                          <button
                            onClick={() => addToCart(part)}
                            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                          >
                            Add to Cart
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Shopping Cart */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow sticky top-6">
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-4">Shopping Cart</h2>
                {cart.length === 0 ? (
                  <p className="text-gray-500 text-center py-6">
                    Your cart is empty
                  </p>
                ) : (
                  <>
                    <div className="space-y-4 mb-6">
                      {cart.map((item) => (
                        <div
                          key={item.part.id}
                          className="flex items-center justify-between p-3 border rounded-lg"
                        >
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
                              <span className="w-8 text-center">
                                {item.quantity}
                              </span>
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
                        <span>Tax (8.5%)</span>
                        <span>${tax.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between font-bold text-lg pt-2 border-t">
                        <span>Total</span>
                        <span>${total.toFixed(2)}</span>
                      </div>
                      <button className="w-full mt-4 bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors">
                        Checkout
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
