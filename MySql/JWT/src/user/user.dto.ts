import { IsNotEmpty, IsEmail } from "class-validator";
import { Transform } from "class-transformer";

declare global {
  namespace Express {
    interface User {
      name: string;
      email: string;
    }
  }
}

// 验证器，数据表列必传、格式提示...
export class UserDto {
  @IsNotEmpty({ message: "名字是必填的" })
  @Transform((user) => user.value.trim())
  name: string;

  @IsNotEmpty({ message: "邮箱是必填的" })
  @IsEmail(
    {
      // ...
    },
    { message: "邮箱格式不正确" }
  )
  email: string;
}
