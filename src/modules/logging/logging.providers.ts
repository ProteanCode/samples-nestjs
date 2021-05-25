import { Provider, ValueProvider } from '@nestjs/common';
import { WinstonService } from './services/winston/winston.service';
import * as config from '../../config/logging.json';
import { default as LoggingConfigInterface } from './services/config/interfaces/config.interface';
import { ConfigService as LoggingConfigService } from './services/config/config.service';
import { LoggingService } from './services/logging.service';

const loggingProviders: Provider[] = [
  {
    provide: LoggingConfigService,
    useValue: config,
  } as ValueProvider<LoggingConfigInterface>,
  {
    provide: LoggingService,
    useClass: WinstonService,
  },
];

export default loggingProviders;
