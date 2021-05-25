import { Module } from '@nestjs/common';
import loggingProviders from './logging/logging.providers';

@Module({
  providers: [...loggingProviders],
  exports: [...loggingProviders],
})
export class LoggingModule {}
