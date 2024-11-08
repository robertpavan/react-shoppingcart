import { Monitor, Cpu, HardDrive, CircuitBoard } from "lucide-react";
import { Part } from "./types";

export const PARTS_FOR_SALE: Part[] = [
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

export const TAX_RATE = 0.13;
