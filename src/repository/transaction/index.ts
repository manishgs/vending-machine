import { TransactionAttributes, TransactionCreationAttributes } from '../../models/transaction/types';
import Transaction from '../../models/transaction';
import BaseRepository from '../contract/baseRepository';

class TransactionRepository extends BaseRepository<TransactionAttributes, TransactionCreationAttributes, Transaction> {
  constructor() {
    super(Transaction);
  }
}

export default new TransactionRepository();
