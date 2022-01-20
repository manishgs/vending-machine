import Product from '../../models/product';

class ProductService {
  get() {
    return Product.find();
  }

  findById(id: number) {
    return Product.findById(id);
  }

  updateQuantity(id: number, quantity: number) {
    return Product.updateQuantity(id, quantity);
  }
}

export default new ProductService();
