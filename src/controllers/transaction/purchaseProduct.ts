import { NextFunction } from 'connect';
import { Response, Request } from 'express';
import { BadRequestException } from '../../exception';
import { PurchaseData } from '../../models/transaction/types';
import { isAmount } from '../../utils';
import Transaction from '../../services/transaction';

const validateRequest = (req: Request): PurchaseData => {
  const { productId, amount } = req.body;
  if (!productId || !amount) {
    throw new BadRequestException('Invalid request');
  }

  if (!isAmount(amount)) {
    throw new BadRequestException('Invalid amount');
  }

  return {
    productId, quantity: 1, amount: Number(amount), vendingMachineId: req.machine.id,
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
