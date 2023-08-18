import { Inject, Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { AppLogger } from 'src/logger/logger.service';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(@Inject(AppLogger) private logger: AppLogger) {}
  use(req: Request, res: Response, next: NextFunction) {
    res.on('close', () => {
      this.logger.log(
        `request url: ${req.baseUrl}, body: ${JSON.stringify(
          req.body,
        )}, query params: ${JSON.stringify(req.query)}; response status code: ${
          res.statusCode
        }`,
      );
    });
    next();
  }
}
