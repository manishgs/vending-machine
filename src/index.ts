import 'dotenv/config';
import express, { Application } from 'express';
import { APP_PORT } from './config';
import errorHandler from './exception/handler';
import { HttpException } from './exception';
import Router from './router';

const app: Application = express();

const App = () => {
  try {
    app.use(express.json());
    app.use('/api', Router);
    app.use(errorHandler);
    app.use('*', (req, res) => {
      res.status(404).send('');
    });

    app.listen(APP_PORT, () => {
      console.log(`Server is running on port ${APP_PORT}`);
    });
  } catch (e: any) {
    throw new HttpException(`Error while starting the server : ${e.message}`);
  }
};

App();
