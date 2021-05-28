import { NestFactory } from '@nestjs/core';
import { SlaveModule } from './slave.module';
import { ScrappingModule } from './modules/scrapping.module';
import { TwitterService } from './modules/scrapping/services/twitter/twitter.service';
import { LoggingModule } from './modules/logging.module';
import { LoggingService } from './modules/logging/services/logging.service';
import { default as AppConfig } from './config/app.json';
import AppConfigInterface from './interfaces/app-config.interface';
import { ManagerService } from './modules/slave/services/manager.service';

async function bootstrap() {
  const config: AppConfigInterface = AppConfig as AppConfigInterface;

  if (config.mode === 'slave') {
    const app = await NestFactory.createApplicationContext(SlaveModule);

    while (true) {
      const manager = app
        .select(SlaveModule)
        .get(ManagerService, { strict: true });

      manager.runAll();

      /*
      const twitter = app
        .select(ScrappingModule)
        .get(TwitterService, { strict: true });

      const id = await twitter.getUserIdByName('elonmusk');
      console.log(id.data.id);
      const tweets = await twitter.getUserTweetsById(id.data.id);
      console.log(tweets);

      const logger = app
        .select(LoggingModule)
        .get(LoggingService, { strict: true });

      logger.info('Hello there');

      await new Promise((resolve) => setTimeout(resolve, 5000));
      //await app.close();
       */
      await new Promise((resolve) => setTimeout(resolve, 5000));
    }
  }

  if (config.mode === 'master') {
    // TODO implement master server
  }
}
bootstrap();
