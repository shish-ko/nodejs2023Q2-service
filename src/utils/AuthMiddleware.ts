import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    if (
      !req.headers.authorization ||
      !req.headers.authorization.startsWith('Bearer ')
    ) {
      return res.status(HttpStatus.UNAUTHORIZED).send();
    }
    const token = req.headers.authorization.split(' ')[1];
    jwt.verify(token, process.env.JWT_SECRET_KEY, (error) => {
      if (error) throw new HttpException('Token has expired', 401);
      next();
    });
  }
}
