import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MessagingModule } from './modules/messaging.module';
import { FirebaseService } from './modules/messaging/services/firebase/firebase.service';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule); // AppModule imports MessagingModule

  const firebaseService = app
    .select(MessagingModule) // Error when using .register() in AppModule imports, no error when the call to register method is removed
    .get(FirebaseService, { strict: true }); // whenever i skip the .register() method call it still does not resolve a FirebaseService

  await app.close();
}
bootstrap();
