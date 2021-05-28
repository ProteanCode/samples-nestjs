import { Module } from '@nestjs/common';
import scrappingProviders from './scrapping/scrapping.providers';

@Module({
  providers: [...scrappingProviders],
  exports: [...scrappingProviders],
})
export class ScrappingModule {}
