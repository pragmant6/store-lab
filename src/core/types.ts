export interface User {
  id: string;
  username: string;
  password?: string;
  createdAt?: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
}

export interface Purchase {
  id: string;
  userId: string;
  productId: string;
  price: number;
  date: string;
  product?: Product;
}