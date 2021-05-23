import { DynamicModule, Module } from '@nestjs/common';
import { FirebaseService } from './messaging/services/firebase/firebase.service';

/*
// Workaround, but not really. If there would be more providers, it would healthcheck every one of them while the app need just first working
@Module({
  providers: [
    {
      provide: FirebaseService,
      useFactory: async () => {
        if (await FirebaseService.healthcheck()) {
          return FirebaseService;
        }
      },
    },
  ],
})
export class MessagingModule {}
*/

@Module({})
export class MessagingModule {
  static register(): DynamicModule {
    return {
      module: MessagingModule,
      providers: [FirebaseService],
      imports: [FirebaseService],
    };
  }
}
