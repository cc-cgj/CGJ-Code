import { Module } from '@nestjs/common';
import { UploadService } from './upload.service';
import { UploadController } from './upload.controller';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as path from 'node:path';

@Module({
  imports: [
    MulterModule.register({
      storage: diskStorage({
        destination: path.join(__dirname, '../images'),
        filename: (req, file, cb) => {
          const filename = `${new Date().getTime()}${path.extname(file.originalname)}`;
          return cb(null, filename);
        },
      }),
    }),
  ],
  controllers: [UploadController],
  providers: [UploadService],
})
export class UploadModule {}
