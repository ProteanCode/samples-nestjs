import { Provider, ValueProvider } from '@nestjs/common';
import { default as TwitterConfigInterface } from '../scrapping/services/twitter/config/interfaces/config.interface';
import { ConfigService as TwitterConfigService } from './services/twitter/config/config.service';
import * as config from '../../config/twitter.json';
import { TwitterService } from './services/twitter/twitter.service';

const scrappingProviders: Provider[] = [
  {
    provide: TwitterConfigService,
    useValue: config,
  } as ValueProvider<TwitterConfigInterface>,
  {
    provide: TwitterService,
    useClass: TwitterService,
  },
];

export default scrappingProviders;
