import { ProductDTO } from 'src/models/product/types';
import Product from '../../models/product';
import { HttpException } from '../../exception';
import VendingMachineRepository from '../../repository/vendingMachine';

class VendingMachineService {
  protected vendingMachine = VendingMachineRepository;

  async getBalance(id: number): Promise<number> {
    const vendingMachine = await this.vendingMachine.findOne({ where: { id } });
    if (!vendingMachine) {
      throw new HttpException('vendingMachine not found');
    }
    return vendingMachine.amount;
  }

  async getProducts(vendingMachineId: number) {
    const doc = await this.vendingMachine.findOne({
      where: { id: vendingMachineId },
      include: [{
        model: Product,
        as: 'products',
      }],
    });
    if (!doc || !doc.products) return [];

    const res: ProductDTO[] = [];
    for (const product of doc.products) {
      res.push({
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: product.VendingMachineProduct.quantity,
      });
    }

    return res;
  }

  updateBalance(vendingMachineId: number, amount: number) {
    return this.vendingMachine.update({ amount }, { where: { id: vendingMachineId } });
  }
}

export default new VendingMachineService();
