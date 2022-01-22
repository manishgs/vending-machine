import Product from '../../models/product';
import Amount from '../amount';
import VendingMachine from '../../models/vendingMachine';
import { AmountMap } from '../amount/types';

class PurchaseTransaction {
  protected product: Product;

  protected vendingMachine: VendingMachine;

  protected receivedAmount: Amount;

  protected vendingMachineAmount: Amount;

  constructor(product: Product, amount: Amount, vendingMachine: VendingMachine) {
    this.product = product;
    this.receivedAmount = amount;
    this.vendingMachine = vendingMachine;
    this.vendingMachineAmount = new Amount(vendingMachine.amount);
  }

  totalRecievedAmount(): number {
    return this.receivedAmount.total();
  }

  isAmountEnough(): boolean {
    return this.receivedAmount.total() >= this.product.price;
  }

  recievedMap(): AmountMap {
    return this.receivedAmount.toMap();
  }

  availableAmount(): Amount {
    const vmAmount = this.vendingMachineAmount.toMap();
    const reAmount = this.receivedAmount.toMap();
    for (const key of Object.keys(reAmount)) {
      if (!vmAmount[key]) vmAmount[key] = 0;
      vmAmount[key] += reAmount[key];
    }
    return new Amount(vmAmount);
  }

  isEnoughbalanceToReturn(): boolean {
    return this.returnAmount().total() === 0 || this.returnAmount().total() < this.availableAmount().total();
  }

  returnAmount(): Amount {
    let totalReturnAmount = this.receivedAmount.total() - this.product.price;
    if (totalReturnAmount < 1) {
      return new Amount({});
    }

    let returnMap: AmountMap = {};
    const vmAmount = this.availableAmount().toMap();
    for (const key of this.availableAmount().denominations()) {
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
    if (this.returnAmount().total() < 1) {
      return new Amount(this.availableAmount().toMap());
    }

    const returnAmount = this.returnAmount().toMap();
    const vmAmount = this.availableAmount().toMap();
    for (const key of this.availableAmount().denominations()) {
      const amount = parseInt(key, 10);
      vmAmount[amount] -= returnAmount[amount];
      if (vmAmount[amount] < 1) {
        delete vmAmount[amount];
      }
    }
    return new Amount(vmAmount);
  }
}

export default PurchaseTransaction;
