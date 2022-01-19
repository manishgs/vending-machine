import { NextFunction } from "connect";
import { Response, Request } from "express";

export const refundProduct = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const data = {
            id : 'XXXX',
            date : 'XXXX',
            amount : 'item cost',
            return : 'customerPay - item cost',
        };
        res.json({data, status:'OK'});
    }catch(e:any){
       next(e);
    }
};