import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MessagingModule } from './modules/messaging.module';
import { MessagingService } from './modules/messaging/services/messaging.service';
import { ScrappingModule } from './modules/scapping.module';
import { TwitterService } from './modules/scrapping/services/twitter/twitter.service';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);

  const twitter = app
    .select(ScrappingModule)
    .get(TwitterService, { strict: true });

  const id = await twitter.getUserIdByName('elonmusk');
  console.log(id.data.id);
  const tweets = await twitter.getUserTweetsById(id.data.id);
  console.log(tweets);
  /*
  const messagingService = app
    .select(MessagingModule)
    .get(MessagingService, { strict: true });

  const messagingServiceSendResponse = await messagingService.send(
    'This is a message sent from NestJS',
    'welcome',
  );
  console.log(messagingServiceSendResponse);
  */

  await app.close();
}
bootstrap();
