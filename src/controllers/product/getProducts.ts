import { NextFunction } from 'connect';
import { Response, Request } from 'express';
import VenderMachine from '../../services/vendingMachine';

export const getProducts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await VenderMachine.getProducts(req.machine.id);
    res.json({ data, status: 'OK' });
  } catch (e: any) {
    next(e);
  }
};
