export interface Part {
  id: number;
  name: string;
  price: number;
  description: string;
  icon: React.ReactNode;
  specs: string;
  stock: number;
}

export interface CartItem {
  part: Part;
  quantity: number;
}
