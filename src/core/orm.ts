import type { Product, Purchase, User } from "./types";

export class Table<T extends { id: string | number }> {
  // Cambiamos 'private' por una propiedad normal
  tableName: string;

  constructor(tableName: string) {
    this.tableName = tableName;
  }

  getAll(): T[] {
    const data = localStorage.getItem(this.tableName);
    return data ? JSON.parse(data) : [];
  }

  saveAll(data: T[]): void {
    localStorage.setItem(this.tableName, JSON.stringify(data));
  }

  create(item: T): T {
    const data = this.getAll();
    data.push(item);
    this.saveAll(data);
    return item;
  }

  update(id: string | number, newData: Partial<T>): T | undefined {
    const data = this.getAll();
    const index = data.findIndex((i) => i.id === id);
    if (index !== -1) {
      data[index] = { ...data[index], ...newData };
      this.saveAll(data);
      return data[index];
    }
    return undefined;
  }

  delete(id: string | number): void {
    const data = this.getAll().filter((i) => i.id !== id);
    this.saveAll(data);
  }

  find(predicate: (item: T) => boolean): T | undefined {
    return this.getAll().find(predicate);
  }

  where(predicate: (item: T) => boolean): T[] {
    return this.getAll().filter(predicate);
  }
}


export const UsersTable = new Table<User>('users');


export const ProductsDB = new Table<Product>('products');


export const PurchasesDB = new Table<Purchase>('purchases');