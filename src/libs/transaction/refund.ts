import Product from '../../models/product';
import Amount from '../amount';
import VendingMachine from '../../models/vendingMachine';
import { AmountMap } from '../amount/types';

class RefundTransaction {
  protected product: Product;

  protected vendingMachine: VendingMachine;

  protected vendingMachineAmount: Amount;

  constructor(product: Product, vendingMachine: VendingMachine) {
    this.product = product;
    this.vendingMachine = vendingMachine;
    this.vendingMachineAmount = new Amount(vendingMachine.amount);
  }

  isEnoughbalanceToReturn(): boolean {
    if (this.vendingMachineAmount.total() > this.product.price) {
      return this.returnAmount().total() > 0;
    }
    return false;
  }

  returnAmount(): Amount {
    let totalReturnAmount = this.product.price;
    let returnMap: AmountMap = {};
    const vmAmount = this.vendingMachineAmount.toMap();
    for (const key of this.vendingMachineAmount.denominations()) {
      const amount = parseInt(key, 10);
      const quantity = Math.floor(totalReturnAmount / amount);
      const q = Math.min(quantity, vmAmount[amount]);
      if (q > 0) {
        returnMap[amount] = q;
        totalReturnAmount -= amount * q;
      }
      if (totalReturnAmount < 1) break;
    }

    if (totalReturnAmount > 0) {
      returnMap = {};
    }

    return new Amount(returnMap);
  }

  vmAmount(): Amount {
    const returnAmount = this.returnAmount().toMap();
    const vmAmount = this.vendingMachineAmount.toMap();
    for (const key of this.vendingMachineAmount.denominations()) {
      const amount = parseInt(key, 10);
      vmAmount[amount] -= returnAmount[amount];
    }
    return new Amount(vmAmount);
  }
}

export default RefundTransaction;
