import { NextFunction } from 'connect';
import { Response, Request } from 'express';
import { RefundData } from '../../models/transaction/type';
import { BadRequestException } from '../../exception';
import Transaction from '../../services/transaction';

const validateRequest = (req: Request): RefundData => {
  const { productId, vendingMachineId } = req.body;
  if (!productId) {
    throw new BadRequestException('Invalid request');
  }

  return { productId, quantity: 1, vendingMachineId };
};

export const refundProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await Transaction.refund(validateRequest(req));
    res.json({ data, status: 'OK' });
  } catch (e: any) {
    next(e);
  }
};
