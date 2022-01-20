import express from 'express';
import next from 'next';
import errorHandler from './exception/handler';
import { HttpException } from './exception';
import APIRoutes from './router';

const app = next({ dev: process.env.NODE_ENV !== 'production' });
const handle = app.getRequestHandler();
const port = Number(process.env.PORT || 3000);
const server = express();

app.prepare().then((): void => {
  try {
    server.use(express.json());
    server.use('/api', APIRoutes);
    server.use(errorHandler);
    server.all('*', (req, res) => handle(req, res));
    server.listen(port, () => {
      console.log('Server is running on port 3000');
    });
  } catch (e: any) {
    throw new HttpException(`Error while starting the server : ${e.message}`);
  }
});
