import { Injectable } from '@nestjs/common';
import { LoggerService } from '@nestjs/common';

@Injectable()
export class AppLogger implements LoggerService {
  log(message: any, ...optionalParams: any[]) {
    console.log(`[${new Date().toLocaleString()}]: ${message}`);
  }
  error(message: any, ...optionalParams: any[]) {
    console.log(message);
  }
  warn(message: any, ...optionalParams: any[]) {
    console.log(message);
  }
}
