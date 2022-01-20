import express from 'express';
import VendingMachine from '../models/vendingMachine';
import { BadRequestException, UnauthorizedException } from '../exception';
import { getProducts } from '../controllers/product';
import { purchaseProduct, refundProduct } from '../controllers/transaction';
import Balance from '../models/balance';

const app = express();

app.use(async (req, res, next) => {
  let token: string = String(req.headers['x-access-token'] || req.headers.authorization || req.headers.token || '');
  try {
    if (!token) {
      throw new BadRequestException('Token not found');
    }

    token = token.replace('Bearer ', '');

    const machine = await VendingMachine.verifyToken(token);
    if (!machine) {
      throw new UnauthorizedException('Token is not valid');
    }

    res.locals.machine = machine;
    next();
  } catch (e) {
    next(e);
  }
});

app.get('/products', getProducts);

app.post('/purchase', purchaseProduct);

app.post('/refund', refundProduct);

app.get('/balance', async (req, res) => {
  const balance = await Balance.get();
  res.json({ data: { balance }, status: 'OK' });
});

export default app;
