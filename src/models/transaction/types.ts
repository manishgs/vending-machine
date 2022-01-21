import { Optional } from 'sequelize';

export interface PurchaseData {
  vendingMachineId: number;
  productId: number;
  quantity: number;
  amount: number;
}

export interface RefundData {
  vendingMachineId: number;
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
  receive: number;
  type: TransactionType;
  return: number;
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
