import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';
import httpStatus from "http-status";


interface ValidationError {
  message: string;
}

export function validateSchema(schema: Joi.ObjectSchema<any>) {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body, { abortEarly: false });
    if (!error) {
      next();
      }else{
        res.status(httpStatus.BAD_REQUEST).send();
      }
      
    }

    
  };



