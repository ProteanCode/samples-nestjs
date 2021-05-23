import { Module } from '@nestjs/common';
import { MessagingModule } from './modules/messaging.module';

@Module({
  imports: [MessagingModule.register()], // If i remove the .register() part, the module is loaded, but the service of the module is not
})
export class AppModule {}
