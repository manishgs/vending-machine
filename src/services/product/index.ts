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

  async findByIdAndVendingMachine(productId: number, vendingMachineId: number): Promise<VendingMachineProduct | null> {
    const data = await VendingMachineProduct.findOne({
      where: { productId, vendingMachineId },
      include: [{
        model: Product,
        as: 'product',
      }],
    });
    if (data) {
      data.price = data.product.price;
    }
    return data;
  }

  updateQuantity(productId: number, vendingMachineId: number, quantity: number) {
    return VendingMachineProduct.update({ quantity }, { where: { productId, vendingMachineId } });
  }
}

export default new ProductService();
