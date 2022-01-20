import fs from 'fs';
import path from 'path';
import { ProductInstance } from './type';
import ProductList from './data.json';

class Product {
  async findById(id: number): Promise<ProductInstance | undefined> {
    return (await this.find()).find((product: ProductInstance) => product.id === id);
  }

  find(): Promise<ProductInstance[]> {
    return new Promise((resolve) => {
      resolve(ProductList);
    });
  }

  async updateQuantity(id: number, quantity: number): Promise<ProductInstance | null> {
    const products = await this.find();

    for (const product of products) {
      if (product.id === id) {
        product.quantity = quantity;
        fs.writeFileSync(path.resolve(__dirname, './data.json'), JSON.stringify(products));
        return product;
      }
    }

    return null;
  }
}

export default new Product();
