import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { VersioningType, ValidationPipe } from '@nestjs/common';
import * as session from 'express-session';
import { Request, Response, NextFunction } from 'express';
import * as cors from 'cors';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { Reseponse } from './common/response';
import { HttpFilter } from './common/filter';

import { RoleGuard } from './guard/role/role.guard';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

// 白名单
const whiteList = ['/list'];

// 全局拦截
function MiddleWareAll(req: Request, res: Response, next: NextFunction) {
  // console.log(req.originalUrl);
  // if (whiteList.includes(req.originalUrl)) {
  //   next();
  // } else {
  //   res.send('小黑子露出鸡脚了吧');
  // }
  next();
}

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  // 跨域
  app.use(cors());
  // 配置cookie
  // app.use(
  //   session({
  //     secret: 'xiaojia',
  //     name: 'xiaojia.sid',
  //   }),
  // );
  // 全局中间件
  app.use(MiddleWareAll);
  // 请求的版本
  app.enableVersioning({
    type: VersioningType.URI,
  });
  // 静态资源的访问
  app.useStaticAssets(join(__dirname, 'images'), {
    prefix: '/static',
  });

  // 注入全局过滤器
  // 处理请求异常
  app.useGlobalFilters(new HttpFilter());
  // 注入响应拦截器
  app.useGlobalInterceptors(new Reseponse());
  // 注册全局 DTO 验证管道 (login.pipe.ts)
  // app.useGlobalPipes(new ValidationPipe());

  // 注入全局守卫
  // app.useGlobalGuards(new RoleGuard());

  // swagger
  const options = new DocumentBuilder()
    .addBearerAuth() // 添加token
    .setTitle('小甲的swagger文档')
    .setDescription('做演示用的')
    .setVersion('1')
    .build();
  const document = SwaggerModule.createDocument(app, options);

  // 配置swagger

  SwaggerModule.setup('api-docs', app, document);

  // 启动服务
  await app.listen(3000);
  console.log("服务已启动: http://localhost:3000")
  console.log("swagger接口文档访问路径: http://localhost:3000/api-docs")
}
bootstrap();
