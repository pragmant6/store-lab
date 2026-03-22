import { ProductsDB, PurchasesDB } from '../core/orm';
import type { Product, Purchase } from '../core/types';

const sleep = (ms: number) => new Promise(r => setTimeout(r, ms));

export const shopService = {
  getProducts: async (search: string, category: string): Promise<Product[]> => {
    await sleep(600);
    let items = ProductsDB.getAll();
    if (search) items = items.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));
    if (category !== 'All') items = items.filter(p => p.category === category);
    return items;
  },

  updateProduct: async (id: string, data: Partial<Product>) => {
    await sleep(500);
    return ProductsDB.update(id, data);
  },

  deleteProduct: async (id: string) => {
    await sleep(400);
    ProductsDB.delete(id);
    return id;
  },

  createPurchase: async (userId: string, productId: string, price: number) => {
    await sleep(800);
    return PurchasesDB.create({
      id: crypto.randomUUID(),
      userId,
      productId,
      price,
      date: new Date().toISOString()
    });
  },

  getMyPurchases: async (userId: string): Promise<Purchase[]> => {
    await sleep(700);
    const raw = PurchasesDB.where(p => p.userId === userId);
    return raw.map(p => ({
      ...p,
      product: ProductsDB.find(prod => prod.id === p.productId)
    }));
  }
};