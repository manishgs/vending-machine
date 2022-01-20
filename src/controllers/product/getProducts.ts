import { NextFunction } from 'connect';
import { Response, Request } from 'express';
import Product from '../../services/product';

export const getProducts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await Product.get();
    res.json({ data, status: 'OK' });
  } catch (e: any) {
    next(e);
  }
};
