import { NextFunction, Request, Response } from 'express';
import { VendingMachineStatus } from '../models/vendingMachine/types';
import VendingMachine from '../repository/vendingMachine';
import { BadRequestException, UnauthorizedException } from '../exception';

export default async (req: Request, res: Response, next: NextFunction) => {
  let token: string = String(req.headers['x-access-token'] || req.headers.authorization || req.headers.token || '');
  try {
    if (!token) {
      throw new BadRequestException('Token not found');
    }

    token = token.replace('Bearer ', '');

    const machine = await VendingMachine.findOne({ where: { token, status: VendingMachineStatus.ACTIVE } });
    if (!machine) {
      throw new UnauthorizedException('Token is not valid');
    }

    req.machine = machine;
    next();
  } catch (e) {
    next(e);
  }
};
