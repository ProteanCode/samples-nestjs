import { Module, ValueProvider } from '@nestjs/common';
import { FirebaseService } from './messaging/services/firebase/firebase.service';
import { ConfigService } from './messaging/services/config/config.service';
import * as config from '../config/messaging.json';
import ConfigInterface from './messaging/services/config/interfaces/config.interface';

@Module({
  providers: [
    {
      provide: ConfigService,
      useValue: config,
    } as ValueProvider<ConfigInterface>,
    {
      provide: FirebaseService,
      useClass: FirebaseService,
      /*
      useFactory: async () => {
        if (await FirebaseService.healthcheck()) {
          return FirebaseService;
        }
      },
       */
    },
  ],
  exports: [FirebaseService],
})
export class MessagingModule {}
