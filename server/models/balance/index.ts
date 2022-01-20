import Transaction from '../transaction';

const balance = 100;

class Balance {
  async get(): Promise<number> {
    const transactions = (await Transaction.find()) || [];
    return balance + transactions.reduce((acc, curr) => acc + curr.receive - curr.return, 0);
  }
}

export default new Balance();
