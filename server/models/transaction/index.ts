import fs from 'fs';
import path from 'path';
import { TransactionInstance } from './type';
import TransactionList from './data.json';

class Transaction {
  async create(data: TransactionInstance) {
    const transactions = await this.find();
    const transaction = { ...data, ...{ id: transactions.length + 1 } };
    transactions.push(transaction);
    fs.writeFileSync(path.resolve(__dirname, './data.json'), JSON.stringify(transactions));
    return transaction;
  }

  find(): Promise<TransactionInstance[]> {
    return new Promise((resolve) => {
      resolve(TransactionList as TransactionInstance[]);
    });
  }
}

export default new Transaction();
