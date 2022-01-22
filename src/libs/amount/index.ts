import { AmountMap } from './types';

class Amount {
  protected amount: AmountMap;

  constructor(amount: AmountMap) {
    this.amount = amount;
  }

  total(): number {
    let total = 0;
    for (const key of Object.keys(this.amount)) {
      total += this.amount[key] * parseInt(key, 10);
    }

    return total;
  }

  toMap(): AmountMap {
    return { ...this.amount };
  }

  denominations(): string[] {
    return Object.keys(this.amount).sort((a, b) => parseInt(b, 10) - parseInt(a, 10));
  }
}

export default Amount;
