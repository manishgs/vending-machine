import express from 'express';
import { getProducts } from '../controllers/product';
import { purchaseProduct, refundProduct } from '../controllers/purchase';

const app = express();

app.get('/products', getProducts);

app.post('/purchase', purchaseProduct);

app.post('/refund', refundProduct);

export default app;
