import {
  Controller,
  Post,
  Get,
  UseInterceptors,
  UploadedFile,
  Param,
  Res,
} from '@nestjs/common';
import { UploadService } from './upload.service';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { join, parse } from 'node:path';
import { zip } from 'compressing';

@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}
  // 上传单个文件
  @Post('album')
  @UseInterceptors(FileInterceptor('file'))
  upload(@UploadedFile() file) {
    console.log(file);
    return `upload`;
  }
  // 下载文件
  @Get('export/:url')
  download(@Param() param, @Res() res) {
    res.download(join(__dirname, '../images', param.url));
  }
  // 下载文件流
  @Get('stream/:url')
  async downStream(@Param() param, @Res() res) {
    const parseUrl = parse(param.url)
    const filePath = join(__dirname, '../public/images', param.url);
    const tarStream = new zip.Stream();
    await tarStream.addEntry(filePath);
    res.setHeader('Content-Type', 'application/octet-stream');
    // 如果想要让客户端访问到相关信息，服务器不仅要在heade里添加，还要将它们在 Access-Control-Expose-Headers 里面列出来
    res.setHeader('Access-Control-Expose-Headers', 'Content-Disposition');
    res.setHeader(
      'Content-Disposition',
      'attachment;filename=' + parseUrl.name,
    );
    tarStream.pipe(res);
  }
}
