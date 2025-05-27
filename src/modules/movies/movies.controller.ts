import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  Get,
  Query,
  HttpException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { S3Service } from 'src/core/storage/s3/s3.service';

@Controller('books')
export class BooksController {
  constructor(private readonly s3Service: S3Service) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadBook(@UploadedFile() file: Express.Multer.File) {
    const prefix = 'books';
    try {
      const result = await this.s3Service.uploadFile(file, prefix);

      if (!result) {
        throw new HttpException('yuklashda xatolik', 500);
      }

      return {
        message: 'Kitob muvaffaqiyatli yuklandi',
        fileKey: result.fileKey,
        url: result.url,
      };
    } catch (error) {
      throw new HttpException('Yuklashda xatolik', 500);
    }
  }

  @Get('view')
  async getViewUrl(@Query('key') key: string) {
    try {
      const url = await this.s3Service.getSignedUrl(key, false);
      return { url };
    } catch (error) {
      throw new HttpException('Url olishd xatolik', 500);
    }
  }

  @Get('download')
  async getDownloadUrl(@Query('key') key: string) {
    try {
      const url = await this.s3Service.getSignedUrl(key, true);
      return { url };
    } catch (error) {
      throw new HttpException('url olishda xatolik', 500);
    }
  }
}
