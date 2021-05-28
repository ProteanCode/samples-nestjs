import { Provider, ValueProvider } from '@nestjs/common';

import * as config from '../../config/slave-manager.json';
import { ManagerService } from './services/manager.service';
import { ManagerConfigService } from './services/config/config.service';
import { TwitterService } from '../scrapping/services/twitter/twitter.service';
import { ScrappingConfigService } from '../scrapping/config/config.service';

const slaveProviders: Provider[] = [
  {
    provide: ManagerConfigService,
    useValue: config,
  } as ValueProvider<ManagerConfigService>,
  {
    provide: ManagerService,
    useClass: ManagerService,
    inject: [TwitterService, ScrappingConfigService],
  },
];

export default slaveProviders;
