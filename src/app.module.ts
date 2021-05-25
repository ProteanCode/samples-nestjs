import { Module } from '@nestjs/common';
import { MessagingModule } from './modules/messaging.module';
import { ScrappingModule } from './modules/scapping.module';

@Module({
  imports: [MessagingModule, ScrappingModule],
})
export class AppModule {}
