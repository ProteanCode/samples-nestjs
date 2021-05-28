import { Module } from '@nestjs/common';
import { MessagingModule } from './modules/messaging.module';
import { ScrappingModule } from './modules/scrapping.module';
import { LoggingModule } from './modules/logging.module';
import slaveProviders from './modules/slave/slave.providers';

@Module({
  providers: [...slaveProviders],
  exports: [...slaveProviders],
  imports: [MessagingModule, ScrappingModule, LoggingModule],
})
export class SlaveModule {}
