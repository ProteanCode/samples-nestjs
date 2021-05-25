import { Provider, ValueProvider } from '@nestjs/common';
import { ConfigService } from './services/config/config.service';
import * as config from '../../config/messaging.json';
import ConfigInterface from './services/config/interfaces/config.interface';
import { FirebaseService } from './services/firebase/firebase.service';
import { NoopService } from './services/noop/noop.service';
import { MessagingService } from './services/messaging.service';

const messagingProviders: Provider[] = [
  {
    provide: ConfigService,
    useValue: config,
  } as ValueProvider<ConfigInterface>,
  {
    provide: MessagingService,
    useFactory: async (config: ConfigService) => {
      if (await FirebaseService.healthcheck()) {
        return new FirebaseService(config);
      }
      return new NoopService();
    },
    inject: [ConfigService],
  },
];

export default messagingProviders;
