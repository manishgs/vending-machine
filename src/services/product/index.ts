import Product from '../../models/product';
import VendingMachineProduct from '../../models/vendingMachineProduct';
import ProductRepository from '../../repository/product';

class ProductService {
  protected product = ProductRepository;

  get() {
    return this.product.find({});
  }

  findById(id: number) {
    return this.product.findOne({ where: { id } });
  }

  async getWithQuantity(productId: number, vendingMachineId: number): Promise<Product | null> {
    const [product, vendingMachineProduct] = await Promise.all([this.product.findOne({ where: { id: productId } }), VendingMachineProduct.findOne({ where: { productId, vendingMachineId } })]);

    if (product && vendingMachineProduct) {
      product.quantity = vendingMachineProduct.quantity;
    }
    return product;
  }

  updateQuantity(productId: number, vendingMachineId: number, quantity: number) {
    return VendingMachineProduct.update({ quantity }, { where: { productId, vendingMachineId } });
  }
}

export default new ProductService();
