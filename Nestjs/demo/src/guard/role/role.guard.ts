import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import type { Request } from 'express';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    console.log('经过了守卫');
    const admin = this.reflector.get<string[]>('role', context.getHandler());
    const req = context.switchToHttp().getRequest<Request>();
    console.log(admin, req.query.role);
    if (admin.includes(req.query.role as string)) {
      return true;
    } else {
      return false;
    }
  }
}
