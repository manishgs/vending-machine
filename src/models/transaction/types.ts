import { Optional } from 'sequelize';
import { AmountMap } from 'src/libs/amount/types';
import Amount from '../../libs/amount';
import VendingMachine from '../vendingMachine';

export interface PurchaseData {
  vendingMachine: VendingMachine;
  productId: number;
  quantity: number;
  amount: Amount;
}

export interface RefundData {
  vendingMachine: VendingMachine;
  productId: number;
  quantity: number;
}

export enum TransactionType {
  BUY = 'BUY',
  REFUND = 'REFUND',
}

export interface TransactionFillable {
  vendingMachineId: number;
  productId: number;
  price: number;
  quantity: number;
  receive: AmountMap;
  type: TransactionType;
  return: AmountMap;
}

export interface TransactionAttributes extends TransactionFillable {
  id: number;
  createdAt: Date;
}

export interface TransactionDTO {
  id: TransactionAttributes['id'];
  type: TransactionAttributes['type'];
  price: TransactionAttributes['price'];
  quantity: TransactionAttributes['quantity'];
  receive: TransactionAttributes['receive'];
  return: TransactionAttributes['return'];
  createdAt: TransactionAttributes['createdAt'];
}

type OptionalTransactionAttributes = 'id' | 'createdAt';

export interface TransactionCreationAttributes extends Optional<TransactionAttributes, OptionalTransactionAttributes> {
}
