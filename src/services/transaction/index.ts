import VendingMachineProduct from '../../models/vendingMachineProduct';
import { BadRequestException, HttpException, ValidationException } from '../../exception';
import ProductService from '../product';
import { PurchaseData, RefundData, TransactionType } from '../../models/transaction/types';
import Transaction from '../../repository/transaction';
import VendingService from '../vendingMachine';
import Sequelize from '../../bootstrap/sequelize';

class TransactionService {
  protected transaction = Transaction;

  async validateRequest(data: PurchaseData | RefundData) {
    const product = await ProductService.findByIdAndVendingMachine(data.productId, data.vendingMachineId);
    // Check if product is available
    if (!product) {
      throw new BadRequestException('Product not found');
    }

    return product;
  }

  async purchase(data: PurchaseData) {
    const product = await this.validateRequest(data);

    // check if product quantity is enough
    if (product.quantity < data.quantity) {
      throw new BadRequestException('Product quantity is not enough');
    }

    // if amount is enough
    if (data.amount < product.price) {
      throw new ValidationException('Not enough amount');
    }

    const returnAmount = data.amount - product.price;

    const balance = await VendingService.getBalance(data.vendingMachineId);
    // check if we have enough balance to return
    if (returnAmount > (balance + data.amount)) {
      throw new ValidationException('Not enough balance');
    }

    const result = await Sequelize.transaction(async (t) => {
      try {
        const transaction = await this.transaction.create({
          vendingMachineId: data.vendingMachineId,
          productId: data.productId,
          price: product.price,
          quantity: data.quantity,
          receive: data.amount,
          type: TransactionType.BUY,
          return: returnAmount,
        });

        // deduct product quantity
        if (transaction) {
          await VendingMachineProduct.update({ quantity: product.quantity - data.quantity }, { where: { productId: data.productId, vendingMachineId: data.vendingMachineId } });
          await VendingService.updateBalance(data.vendingMachineId, balance + product.price);
        }
        return transaction;
      } catch (e: any) {
        t.rollback();
        console.log(e.message);
        throw new HttpException('Transaction failed');
      }
    });
    return result.toDTO();
  }

  async refund(data: RefundData) {
    const product = await this.validateRequest(data);

    const returnAmount = product.price;

    const balance = await VendingService.getBalance(data.vendingMachineId);
    // check if we have enough balance to return
    if (returnAmount > balance) {
      throw new ValidationException('Not enough balance');
    }

    const result = await Sequelize.transaction(async (t) => {
      try {
        const transaction = await this.transaction.create({
          vendingMachineId: data.vendingMachineId,
          productId: data.productId,
          price: product.price,
          quantity: data.quantity,
          receive: 0,
          type: TransactionType.REFUND,
          return: product.price,
        });

        // deduct product quantity
        if (transaction) {
          await VendingMachineProduct.update({ quantity: product.quantity + data.quantity }, { where: { productId: data.productId, vendingMachineId: data.vendingMachineId } });
          await VendingService.updateBalance(data.vendingMachineId, balance - product.price);
        }

        return transaction;
      } catch (e: any) {
        t.rollback();
        console.log(e.message);
        throw new HttpException('Transaction failed');
      }
    });
    return result.toDTO();
  }
}

export default new TransactionService();
