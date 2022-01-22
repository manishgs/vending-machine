import { NextFunction } from 'connect';
import { Response, Request } from 'express';
import Amount from '../../libs/amount/amount';
import { Denomination } from '../../libs/amount/types';
import { BadRequestException } from '../../exception';
import { PurchaseData } from '../../models/transaction/types';
import { isAmount } from '../../utils';
import Transaction from '../../services/transaction';

const validateRequest = (req: Request): PurchaseData => {
  const { productId, amount } = req.body;
  if (!productId || !amount || typeof amount !== 'object') {
    throw new BadRequestException('Invalid request');
  }

  for (const key of Object.keys(amount)) {
    if (parseInt(key, 10) !== Denomination.one) {
      throw new BadRequestException('Invalid request');
    }

    if (!isAmount(amount[key])) {
      throw new BadRequestException('Invalid amount');
    }

    amount[key] = parseInt(amount[key], 10);
  }

  return {
    productId, quantity: 1, amount: new Amount(amount), vendingMachine: req.machine,
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
