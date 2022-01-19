import express, { Application } from 'express';
import errorHandler from './exception/handler';
import { HttpException } from './exception';
import Router from './router';

const app: Application = express();

const App = () => {
  try {
    app.use(Router);
    app.use(errorHandler);
    app.use('*', (req, res) => {
      res.status(404).send('');
    });

    app.listen(3000, () => {
      console.log('Server is running on port 3000');
    });
  } catch (e: any) {
    throw new HttpException(`Error while starting the server : ${e.message}`);
  }
};

App();
