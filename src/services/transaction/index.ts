import PurchaseTransaction from '../../libs/transaction/purchase';
import RefundTransaction from '../../libs/transaction/refund';
import VendingMachineProduct from '../../models/vendingMachineProduct';
import { BadRequestException, HttpException, ValidationException } from '../../exception';
import ProductService from '../product';
import { PurchaseData, RefundData, TransactionType } from '../../models/transaction/types';
import TransactionRepository from '../../repository/transaction';
import VendingService from '../vendingMachine';
import Sequelize from '../../bootstrap/sequelize';

class TransactionService {
  protected transaction = TransactionRepository;

  async validateRequest(data: PurchaseData | RefundData) {
    const product = await ProductService.getWithQuantity(data.productId, data.vendingMachine.id);
    // Check if product is available
    if (!product) {
      throw new BadRequestException('Product not found');
    }

    // check if product quantity is enough
    if (product.quantity < data.quantity) {
      throw new BadRequestException('Product quantity is not enough');
    }

    return product;
  }

  async purchase(data: PurchaseData) {
    const product = await this.validateRequest(data);
    const transaction = new PurchaseTransaction(product, data.amount, data.vendingMachine);

    // if amount is enough
    if (!transaction.isAmountEnough()) {
      throw new ValidationException('Not enough amount');
    }

    // check if we have enough balance to return
    if (!transaction.isEnoughbalanceToReturn()) {
      throw new ValidationException('Not enough balance');
    }

    const result = await Sequelize.transaction(async (t) => {
      try {
        const txn = await this.transaction.create({
          vendingMachineId: data.vendingMachine.id,
          productId: data.productId,
          price: product.price,
          quantity: data.quantity,
          receive: transaction.recievedMap(),
          type: TransactionType.BUY,
          return: transaction.returnAmount().toMap(),
        });

        // deduct product quantity
        if (txn) {
          await VendingMachineProduct.update({ quantity: product.quantity - data.quantity }, { where: { productId: data.productId, vendingMachineId: data.vendingMachine.id } });
          await VendingService.updateBalance(data.vendingMachine.id, transaction.vmAmount().toMap());
        }
        return txn;
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
    const transaction = new RefundTransaction(product, data.vendingMachine);

    // check if we have enough balance to return
    if (!transaction.isEnoughbalanceToReturn()) {
      throw new ValidationException('Not enough balance');
    }

    const result = await Sequelize.transaction(async (t) => {
      try {
        const txn = await this.transaction.create({
          vendingMachineId: data.vendingMachine.id,
          productId: data.productId,
          price: product.price,
          quantity: data.quantity,
          receive: {},
          type: TransactionType.REFUND,
          return: transaction.returnAmount().toMap(),
        });

        // deduct product quantity
        if (transaction) {
          await VendingMachineProduct.update({ quantity: product.quantity + data.quantity }, { where: { productId: data.productId, vendingMachineId: data.vendingMachine.id } });
          await VendingService.updateBalance(data.vendingMachine.id, transaction.vmAmount().toMap());
        }

        return txn;
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
