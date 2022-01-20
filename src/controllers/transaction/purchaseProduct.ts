import { NextFunction } from 'connect';
import { Response, Request } from 'express';
import { BadRequestException } from '../../exception';
import { PurchaseData } from '../../models/transaction/type';
import { isAmount } from '../../utils';
import Transaction from '../../services/transaction';

const validateRequest = (req: Request): PurchaseData => {
  const { productId, amount, vendingMachineId } = req.body;
  if (!productId || !amount || !vendingMachineId) {
    throw new BadRequestException('Invalid request');
  }

  if (!isAmount(amount)) {
    throw new BadRequestException('Invalid amount');
  }

  return {
    productId, quantity: 1, amount: Number(amount), vendingMachineId,
  };
};

export const purchaseProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await Transaction.purchase(validateRequest(req));
    res.json({ data, status: 'OK' });
  } catch (e: any) {
    next(e);
  }
};
