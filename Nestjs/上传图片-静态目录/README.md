### @nestjs/platform-express nestJs自带了

### multer   

```sh
  pnpm i multer -S
  pnpm i @types/multer -D 
  nest g res upload
```

在upload  Module 使用MulterModule register注册存放图片的目录
需要用到  multer 的  diskStorage 设置存放目录 extname 用来读取文件后缀 filename给文件重新命名


2. controller 使用
使用 UseInterceptors 装饰器  FileInterceptor是单个 读取字段名称  FilesInterceptor是多个

参数 使用 UploadedFile 装饰器接受file 文件


3. 生成静态目录访问上传之后的图片 

```ts
// useStaticAssets prefix 是虚拟前缀
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {NestExpressApplication} from '@nestjs/platform-express'
import { join } from 'path'
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useStaticAssets(join(__dirname,'images'),{
     prefix:"/xiaoman"
  })
  await app.listen(3000);
}
bootstrap();
```