import { ProductAttributes, ProductCreationAttributes } from '../../models/product/types';
import Product from '../../models/product';
import BaseRepository from '../contract/baseRepository';

class ProductRepository extends BaseRepository<ProductAttributes, ProductCreationAttributes, Product> {
  constructor() {
    super(Product);
  }

  findById(id: number): Promise<Product | null> {
    return this.findOne({ where: { id } });
  }
}

export default new ProductRepository();
