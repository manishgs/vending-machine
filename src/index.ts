import 'dotenv/config';
import express from 'express';
import next from 'next';
import { APP_PORT } from './config';
import errorHandler from './exception/handler';
import { HttpException } from './exception';
import APIRoutes from './router';
import sequelize from './bootstrap/sequelize';

const app = next({ dev: process.env.NODE_ENV !== 'production' });
const handle = app.getRequestHandler();
const port = Number(APP_PORT || 3000);
const server = express();

app.prepare().then(async () => {
  try {
    server.use(express.json());
    server.use('/api', APIRoutes);
    server.use(errorHandler);
    server.all('*', (req, res) => handle(req, res));
    await sequelize.authenticate();

    server.listen(port, () => {
      console.log('Server is running on port 3000');
    });
  } catch (e: any) {
    throw new HttpException(`Error while starting the server : ${e.message}`);
  }
});
