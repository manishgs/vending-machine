import { NextFunction } from 'connect';
import { Response, Request } from 'express';

export const getProducts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = [{
      id: '',
      name: '',
      price: '',
      stock: '',
    }];
    res.json({ data, status: 'OK' });
  } catch (e:any) {
    next(e);
  }
};
