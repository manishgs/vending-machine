import express from 'express';
import tokenMiddleware from '../bootstrap/tokenMiddleware';
import { getProducts } from '../controllers/product';
import { purchaseProduct, refundProduct } from '../controllers/transaction';
import { getBalance } from '../controllers/vendingMachine';

const app = express();

app.use(tokenMiddleware);

app.get('/products', getProducts);

app.post('/purchase', purchaseProduct);

app.post('/refund', refundProduct);

app.get('/balance', getBalance);

export default app;
