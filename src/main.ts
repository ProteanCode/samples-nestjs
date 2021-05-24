import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MessagingModule } from './modules/messaging.module';
import { FirebaseService } from './modules/messaging/services/firebase/firebase.service';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);

  const firebaseService = app
    .select(MessagingModule)
    .get(FirebaseService, { strict: true });

  const x = await firebaseService.send('xxx', 'csdc');
  console.log(x);

  await app.close();
}
bootstrap();
