import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppService2 } from './app.service2';
import { UserModule } from './user/user.module';
import { ConfigModule } from './config/config.module';
import { ListModule } from './list/list.module';
import { UploadModule } from './upload/upload.module';
import { LoginModule } from './login/login.module';
import { SpiderModule } from './spider/spider.module';
import { GuardModule } from './guard/guard.module';
import { SwaggerModule } from './swagger/swagger.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MysqlModule } from './mysql/mysql.module';
import { Mysql } from './mysql/entities/mysql.entity';
import { CurdModule } from './curd/curd.module';
import { TransactionModule } from './transaction/transaction.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql', //数据库类型
      username: 'root', //账号
      password: 'cgj@123', //密码
      host: 'localhost', //host
      port: 3306, //
      database: 'nest_typeorm', //新建的数据库名
      // 加载实体的三种方式
      // entities: [
      //   // 1. 手动引入
      //   Mysql,
      //   // 2. 模糊匹配
      //   __dirname + '/**/*.entity{.ts,.js}',
      // ], //实体文件
      // 建议通过.env 生产环境为false, 开发为true
      synchronize: true, //synchronize字段代表是否自动将实体类同步到数据库
      retryDelay: 500, //重试连接数据库间隔
      retryAttempts: 10, //重试连接数据库的次数
      // 3. 自动加载
      autoLoadEntities: true, //如果为true,将自动加载实体 forFeature()方法注册的每个实体都将自动添加到配置对象的实体数组中
    }),
    UserModule,
    ListModule,
    // 注入全局module, 通过forRoot传参
    ConfigModule.forRoot({
      path: '/xiaojia',
    }),
    UploadModule,
    LoginModule,
    SpiderModule,
    GuardModule,
    SwaggerModule,
    MysqlModule,
    CurdModule,
    TransactionModule,
  ],
  controllers: [AppController],
  providers: [
    AppService2,
    // 1. 语法糖
    // AppService,
    // 2. 自定义名称
    {
      provide: 'ABC',
      useValue: AppService,
    },
    // 3.自定义注入值
    {
      provide: 'Test',
      useValue: ['TB', 'PDD', 'JD'],
    },
    // 4.工厂模式
    {
      provide: 'CCC',
      inject: [AppService2],
      // useFactory: (appService2: AppService2) => {
      //   console.log(appService2.getHello());
      //   return 123;
      // },
      async useFactory(appService2: AppService2) {
        return await new Promise((resolve) => {
          setTimeout(() => {
            resolve(appService2.getHello());
          }, 10000);
        });
      },
    },
  ],
})
export class AppModule {}
