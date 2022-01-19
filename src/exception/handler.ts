import { NextFunction, Request, Response } from 'express';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  const status = err.status || 500;
  const message = err.message || (err.errors && err.errors[0].message) || 'Internal Server Error';
  if (status === 500) {
    const { ip, hostname, originalUrl } = req;
    const requestData: any = {
      stack: err.stack,
      status: err.status,
      ip,
      url: hostname + originalUrl,
      body: req.body,
      query: req.query,
    };

    console.error(`requestData ${message} ${err.stack}`, requestData);
  }

  return res.status(status).json({
    message,
    status: 'error',
  });
};

process.on('unhandledRejection', (err: Error) => {
  console.error(`unhandledRejection: ${err.message} ${err.stack}`);
  process.exit();
});

process.on('uncaughtException', (err: Error) => {
  console.error(`unhandledRejection: ${err.message} ${err.stack}`);
  process.exit();
});

export default errorHandler;
