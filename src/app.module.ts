import { Module } from '@nestjs/common';
import { MessagingModule } from './modules/messaging.module';
import { ScrappingModule } from './modules/scapping.module';
import { LoggingModule } from './modules/logging.module';

@Module({
  imports: [MessagingModule, ScrappingModule, LoggingModule],
})
export class AppModule {}
