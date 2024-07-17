import {
  SetMetadata,
  createParamDecorator,
  ExecutionContext,
  applyDecorators
} from '@nestjs/common';

export const Role = (...args: string[]) => SetMetadata('role', args);

export const RoleReqUrl = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest();
    console.log(data, '====>');
    // return applyDecorators(Role,xxx,xx)
    return req.url;
  },
);
