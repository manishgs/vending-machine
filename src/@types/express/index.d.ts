// eslint-disable-next-line @typescript-eslint/no-unused-vars
import * as express from 'express';
import VendingMachine from '../../models/vendingMachine';

declare global {
  namespace Express {
    export interface Request {
      machine: VendingMachine;
    }
  }
}
