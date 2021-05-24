import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MessagingModule } from './modules/messaging.module';
import { FirebaseService } from './modules/messaging/services/firebase/firebase.service';
import { ConfigService } from './modules/messaging/services/config/config.service';
import { default as MessagingConfigInterface } from './modules/messaging/services/config/interfaces/config.interface';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);

  const firebaseService = app
    .select(MessagingModule)
    .get(FirebaseService, { strict: true });

  const messagingConfig: MessagingConfigInterface = app
    .select(MessagingModule)
    .get(ConfigService, { strict: true });

  await app.close();
}
bootstrap();
