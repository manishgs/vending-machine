import express from 'express';
import { getProducts } from '../controllers/product';
import { purchaseProduct, refundProduct } from '../controllers/transaction';
import Balance from '../models/balance';

const app = express();

app.get('/products', getProducts);

app.post('/purchase', purchaseProduct);

app.post('/refund', refundProduct);

app.get('/balance', async (req, res) => {
  const balance = await Balance.get();
  res.json({ data: { balance }, status: 'OK' });
});

export default app;
