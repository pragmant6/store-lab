import { ProductsDB } from './orm';

export const seedDatabase = () => {
  if (ProductsDB.getAll().length === 0) {
    const initial = [
      { id: '1', name: 'MacBook Pro M3', price: 2500, category: 'Laptops' },
      { id: '2', name: 'iPhone 15 Pro', price: 1200, category: 'Phones' },
      { id: '3', name: 'Sony XM5', price: 350, category: 'Audio' },
      { id: '4', name: 'Keychron K2', price: 90, category: 'Audio' }
    ];
    initial.forEach(p => ProductsDB.create(p));
  }
};