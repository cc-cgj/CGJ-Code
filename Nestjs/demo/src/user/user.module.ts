import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { Logger } from 'src/middleware';

@Module({
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule implements NestModule {
  // 配置中间件
  configure(consumer: MiddlewareConsumer) {
    // 1. 配置controller的路由
    // consumer.apply(Logger).forRoutes('user')
    // 2. 指定 拦截的方法
    // consumer.apply(Logger).forRoutes({
    //   path: 'user',
    //   method: RequestMethod.POST,
    // });
    // 3.直接把UserService注入进去
    consumer.apply(Logger).forRoutes(UserController);
  }
}
