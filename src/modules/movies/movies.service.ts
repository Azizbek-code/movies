import { Injectable } from '@nestjs/common';
import { S3Service } from 'src/core/storage/s3/s3.service';

@Injectable()
export class BooksService {
  constructor(private readonly s3Service: S3Service) {}

  async uploadBooks(file: Express.Multer.File) {
    const prefix = 'books';
    const result = await this.s3Service.uploadFile(file, prefix);

    if (!result) {
      throw new Error('Kitob yuklashda xatolik yuz berdi');
    }

    return result;  
  }
}
