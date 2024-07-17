import { Controller, Get, Inject } from '@nestjs/common';
import { AppService } from './app.service';
import { UserService } from './user/user.service';

@Controller('get')
export class AppController {
  constructor(
    /** @providers (提供者)演练  */
    @Inject('ABC') private readonly appService: AppService,
    @Inject('Test') private readonly shop: string[],
    @Inject('CCC') private readonly ccc: number,
    private readonly userService: UserService,
    /** @Module (提供者)演练  */
  ) {}

  @Get('hello')

  /** @providers (提供者)演练  */
  // getHello(): string {
  //   return this.appService.getHello();
  // },
  // getHello(): string []{
  //   return this.shop;
  // }
  // getHello(): number {
  //   return this.ccc;
  // }

  /** @Module (提供者)演练  */
  getHello(): string {
    return this.userService.findAll();
  }
}
