import { Provider, ValueProvider } from '@nestjs/common';
import { default as TwitterConfigInterface } from '../scrapping/services/twitter/config/interfaces/config.interface';
import { TwitterConfigService } from './services/twitter/config/config.service';
import * as twitterConfig from '../../config/twitter.json';
import * as scrappingConfig from '../../config/scrapping.json';
import { TwitterService } from './services/twitter/twitter.service';
import { ScrappingConfigService } from './config/config.service';
import { default as ScrappingConfigInterface } from './config/interfaces/config.interface';

const scrappingProviders: Provider[] = [
  {
    provide: ScrappingConfigService,
    useValue: scrappingConfig,
  } as ValueProvider<ScrappingConfigInterface>,
  {
    provide: TwitterConfigService,
    useValue: twitterConfig,
  } as ValueProvider<TwitterConfigInterface>,
  {
    provide: TwitterService,
    useClass: TwitterService,
  },
];

export default scrappingProviders;
