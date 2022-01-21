import { NextFunction, Response, Request } from 'express';
import VendingMachine from '../../services/vendingMachine';

export const getBalance = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const balance = await VendingMachine.getBalance(req.machine.id);
    res.json({ data: { balance }, status: 'OK' });
  } catch (e: any) {
    next(e);
  }
};
