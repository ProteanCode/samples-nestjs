import { Injectable } from '@nestjs/common';
import winston, { Logger, LoggerOptions, transports } from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';
import { ConfigService } from '../config/config.service';
import ConfigInterface from '../config/interfaces/config.interface';
import { LoggingService } from '../logging.service';

@Injectable()
export class WinstonService extends LoggingService {
  private logger: Logger;
  private readonly options: LoggerOptions;
  private readonly config: ConfigInterface;

  private readonly format = winston.format.json();

  constructor(private readonly configService: ConfigService) {
    super();
    this.config = configService as ConfigInterface;
    this.options = {
      level: 'info',
      format: this.format,
      transports: [
        new winston.transports.File({
          filename: this.config.dir + '/info.log',
          level: 'info',
          format: this.format,
        }),
        new winston.transports.File({
          filename: this.config.dir + '/error.log',
          level: 'error',
          format: this.format,
        }),
      ],
      exceptionHandlers: [
        new transports.File({
          filename: this.config.dir + '/exceptions.log',
          format: this.format,
        }),
      ],
    };

    if (this.config.daily) {
      (this.options.transports as any[]).push(
        new DailyRotateFile({
          filename: this.config.dir + '/daily/%DATE%.log',
          datePattern: 'YYYY-MM-DD',
          maxSize: '20m',
          maxFiles: '3d',
          format: this.format,
        }),
      );
    }

    if (process.env.NODE_ENV !== 'production') {
      (this.options.transports as any[]).push(
        new winston.transports.Console({
          format: winston.format.simple(),
        }),
      );
    }

    this.logger = winston.createLogger(this.options);
  }

  info(object: any) {
    this.logger.info(object);
  }
}
