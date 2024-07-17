1. 先创建一个 pipe 验证管道

```sh
nest g pi 文件名字
```

2. 安装验证器

```sh
npm i --save class-validator class-transformer
```

```ts
// create-login.dto.ts
import { IsNotEmpty, IsString } from "class-validator";
export class CreatePDto {
  @IsNotEmpty() //验证是否为空
  @IsString() //是否为字符串
  name: string;

  @IsNotEmpty()
  age: number;
}
```

3. controller 使用管道 和定义类型
   ![alt text](<images/3.controller 使用管道 和定义类型.png>)

4. 实现验证 transform
   value 就是 前端传过来的数据 metaData 就是元数据 通过 metatype 可以去实例化这个类
   ![alt text](images/4.实现验证transform.png)
   实例化 DTO
   ![alt text](<images/4. 实例化DTO.png>)
   通过 validate 验证 DTO 返回一个 promise 的错误信息 如果有错误抛出
   ![alt text](<images/4. 通过 validate 验证 DTO 返回一个promise 的错误信息 如果有错误抛出.png>)

5. 注册全局 DTO 验证管道
![alt text](<images/5. 注册全局 DTO 验证管道.png>)
![alt text](<images/5. 注册全局 DTO 验证管道（请求测试）.png>)
