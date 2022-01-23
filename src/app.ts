import 'dotenv/config';
import express, { Application } from 'express';
import next from 'next';
import errorHandler from './exception/handler';
import APIRoutes from './router';
import sequelize from './bootstrap/sequelize';

const nextApp = next({ dev: process.env.NODE_ENV !== 'production' });
const handle = nextApp.getRequestHandler();
const server = express();

const App = async (): Promise<Application> => {
  await nextApp.prepare();
  server.use(express.json());
  server.use('/api', APIRoutes);
  server.use(errorHandler);
  server.all('*', (req, res) => handle(req, res));
  await sequelize.authenticate();
  return server;
};

export default App;
