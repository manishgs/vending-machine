import { ProductAttributes, ProductCreationAttributes } from '../../models/product/types';
import Product from '../../models/product';
import BaseRepository from '../contract/baseRepository';

class ProductRepository extends BaseRepository<ProductAttributes, ProductCreationAttributes, Product> {
  constructor() {
    super(Product);
  }
}

export default new ProductRepository();
