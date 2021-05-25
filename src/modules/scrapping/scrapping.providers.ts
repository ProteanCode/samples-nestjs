import { Provider, ValueProvider } from '@nestjs/common';
import ConfigInterface from '../scrapping/services/config/interfaces/config.interface';
import { ConfigService } from './services/config/config.service';
import * as config from '../../config/twitter.json';
import { TwitterService } from './services/twitter/twitter.service';

const scrappingProviders: Provider[] = [
  {
    provide: ConfigService,
    useValue: config,
  } as ValueProvider<ConfigInterface>,
  {
    provide: TwitterService,
    useClass: TwitterService,
  },
];

export default scrappingProviders;
