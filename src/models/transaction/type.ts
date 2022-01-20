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

export interface TransactionInstance {
  id?: number;
  vendingMachineId: number;
  productId: number;
  price: number;
  quantity: number;
  receive: number;
  type: TransactionType;
  return: number;
}
