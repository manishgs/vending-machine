import { BadRequestException, ValidationException } from '../../exception';
import ProductService from '../product';
import { PurchaseData, RefundData, TransactionType } from '../../models/transaction/type';
import Transaction from '../../models/transaction';
import VendingMachine from '../../models/vendingMachine';
import Balance from '../../models/balance';

class TransactionService {
  async validateRequest(data: PurchaseData | RefundData) {
    const product = await ProductService.findById(data.productId);
    // Check if product is available
    if (!product) {
      throw new BadRequestException('Product not found');
    }

    // Check if vending machine is available
    const machine = await VendingMachine.findById(data.vendingMachineId);

    // Check if product quantity is enough
    if (!machine) {
      throw new BadRequestException('Invalid Vending Machine');
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

    const balance = await Balance.get();
    // check if we have enough balance to return
    if (returnAmount > balance) {
      throw new ValidationException('Not enough balance');
    }

    // implement transaction logic
    const transaction = await Transaction.create({
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
      await ProductService.updateQuantity(data.productId, product.quantity - data.quantity);
    }
    return transaction;
  }

  async refund(data: RefundData) {
    const product = await this.validateRequest(data);

    const returnAmount = product.price;

    const balance = await Balance.get();
    // check if we have enough balance to return
    if (returnAmount > balance) {
      throw new ValidationException('Not enough balance');
    }

    // implement transaction logic
    const transaction = await Transaction.create({
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
      await ProductService.updateQuantity(data.productId, product.quantity + data.quantity);
    }
    return transaction;
  }
}

export default new TransactionService();
