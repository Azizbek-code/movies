import { Module } from '@nestjs/common';
import { BooksController } from './movies.controller';
import { StorageModule } from 'src/core/storage/storage.module';
import { BooksService } from './movies.service';

@Module({
  imports:[StorageModule],
  controllers: [BooksController],
  providers: [BooksService],
})
export class BooksModule {}
