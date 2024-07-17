import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Version,
  Request,
  Query,
  Headers,
  HttpCode,
  Req,
  Res,
  Session,
  Inject,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as svgCaptcha from 'svg-captcha';

@Controller('user')
export class UserController {
  /** 验证码 */

  @Get('code')
  createCode(@Req() req, @Res() res, @Session() session) {
    const captcha = svgCaptcha.create({
      size: 4, //生成几个验证码
      fontSize: 50, //文字大小
      width: 100, //宽度
      height: 34, //高度
      background: '#cc9966', //背景颜色
    });
    session.code = captcha.text.toLowerCase();
    res.type('image/svg+xml');
    res.send(captcha.data);
  }
  @Post('create')
  createUser(@Body() body, @Session() session) {
    console.log(body, session.code);

    if (body?.code.toLowerCase() === session.code.toLowerCase()) {
      return {
        code: 200,
        message: '验证码正确',
      };
    } else {
      return {
        code: 500,
        message: '验证码错误',
      };
    }
  }

  /** 常用装饰器 */
  constructor(
    private readonly userService: UserService,
  ) {}

  @Get()
  // findAll(@Request() req) {
  findAll(@Query() query) {
    console.log(query);
    return {
      code: 200,
      message: query.name,
    };
  }

  @Post()
  create(@Body('age') body) {
    console.log(body);
    return {
      code: 200,
    };
  }

  @Get(':id')
  @HttpCode(500)
  findId(@Param('id') id, @Headers() headers) {
    console.log(id);
    console.log(headers);
    return {
      code: 200,
    };
  }
}
