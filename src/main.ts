import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MessagingModule } from './modules/messaging.module';
import { MessagingService } from './modules/messaging/services/messaging.service';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);

  const messagingService = app
    .select(MessagingModule)
    .get(MessagingService, { strict: true });

  const messagingServiceSendResponse = await messagingService.send(
    'This is a message sent from NestJS',
    'welcome',
  );
  console.log(messagingServiceSendResponse);

  await app.close();
}
bootstrap();
