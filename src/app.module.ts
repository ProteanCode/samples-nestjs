import { Module } from '@nestjs/common';
import { MessagingModule } from './modules/messaging.module';

@Module({
  imports: [MessagingModule],
})
export class AppModule {}
