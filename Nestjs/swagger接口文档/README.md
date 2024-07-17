<a href="">swagger</a> 用于提供给前端接口文档

### 安装

```sh
npm install  @nestjs/swagger swagger-ui-express
```

1. 在 main.ts 注册 swagger

```ts
// main.ts
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const options = new DocumentBuilder()
    .setTitle("小满接口文档")
    .setDescription("描述，。。。")
    .setVersion("1")
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup("/api-docs", app, document);
  await app.listen(3000);
}
bootstrap();
```

![alt text](<images/1. 在 main.ts 注册 swagger.png>)

2. 打开对应的路径即可
   ![alt text](<images/2. 打开对应的路径即可.png>)

tip: 现在发现并没有分组很乱

3. 可以使用 ApiTags 添加分组
   ![alt text](<images/3. 可以使用ApiTags 添加分组.png>)
   ![alt text](<images/3. 可以使用ApiTags 添加分组（结果）.png>)

4. ApiOperation 接口描述

```ts
import {ApiOperation} from '@nestjs/swagger'
  @Get()
  @Role('admin')
  @ApiOperation({summary:"测试admin",description:"请求该接口需要amdin权限"})
  findAll(@ReqUrl('123') url:string) {
    console.log(url,'url')
    return this.guardService.findAll();
  }
```

5. ApiQuery 修饰 get

```ts
 @ApiQuery({name:"xxxx",description:"bbb"})
```

6. ApiProperty 定义 Post

```ts
import { ApiProperty } from "@nestjs/swagger";

export class CreateGuardDto {
  @ApiProperty({ description: "姓名", example: "小满" })
  name: string;
  @ApiProperty({ description: "年龄" })
  age: number;
}
```

![alt text](<images/6. ApiProperty 定义 Post（结果）.png>)

7. ApiResponse 自定义返回信息

```ts
 @ApiResponse({status:403,description:"自定义返回信息"})
```

8. ApiBearerAuth jwt token
   main.ts 增加 addBearerAuth()
   ![alt text](<images/8. main.ts 增加 addBearerAuth.png>)
   controller 使用 ApiBearerAuth
   ![alt text](<images/8. controller使用ApiBearerAuth.png>)
   
   # 添加token
   页面展示
   ![alt text](<images/8. 添加token-页面展示-第一步.png>)
   ![alt text](<images/8. 添加token-页面展示-第二步.png>)
   请求头携带了 

9. 其他装饰器 
