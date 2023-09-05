import { Injectable } from '@nestjs/common';
import { LoggerService } from '@nestjs/common';
import {
  appendFileSync,
  existsSync,
  mkdirSync,
  readdirSync,
  statSync,
} from 'node:fs';
import { parse, resolve } from 'node:path';
import { EOL } from 'node:os';

@Injectable()
export class AppLogger implements LoggerService {
  logsDir = resolve(resolve(), 'serverlogs');
  constructor() {
    if (!existsSync(this.logsDir)) {
      mkdirSync(this.logsDir, { recursive: true });
    }
  }
  log(message: any) {
    const chunk = `[${new Date().toLocaleString()}]: ${message}`;
    const dirFiles = readdirSync(this.logsDir);
    const logFiles = dirFiles
      .filter((name) => name.startsWith('log'))
      .sort(
        (a, b) => +parse(b).name.substring(4) - +parse(a).name.substring(4),
      );
    if (!logFiles[0]) {
      appendFileSync(
        resolve(this.logsDir, `log_${Date.now()}.txt`),
        chunk + EOL,
      );
    } else {
      const lastFileStat = statSync(resolve(this.logsDir, logFiles[0]));
      if (lastFileStat.size < +process.env.MAX_LOGFILE_SIZE * 1024) {
        appendFileSync(resolve(this.logsDir, logFiles[0]), chunk + EOL);
      } else {
        appendFileSync(
          resolve(this.logsDir, `log_${Date.now()}.txt`),
          chunk + EOL,
        );
      }
    }
    console.log(chunk);
  }

  async error(message: any) {
    const chunk = `[${new Date().toLocaleString()}]: ERROR: ${message}`;

    const dirFiles = readdirSync(this.logsDir);
    const errorFiles = dirFiles
      .filter((name) => name.startsWith('error'))
      .sort(
        (a, b) => +parse(b).name.substring(6) - +parse(a).name.substring(6),
      );
    if (!errorFiles[0]) {
      appendFileSync(
        resolve(this.logsDir, `error_${Date.now()}.txt`),
        chunk + EOL,
      );
    } else {
      const lastFileStat = statSync(resolve(this.logsDir, errorFiles[0]));
      if (lastFileStat.size < +process.env.MAX_LOGFILE_SIZE * 1024) {
        appendFileSync(resolve(this.logsDir, errorFiles[0]), chunk + EOL);
      } else {
        appendFileSync(
          resolve(this.logsDir, `error_${Date.now()}.txt`),
          chunk + EOL,
        );
      }
    }
  }
  warn(message: any) {
    const chunk = `[${new Date().toLocaleString()}]: WARN: ${message}`;
    this.log(chunk);
  }
}
