import {
  Catch,
  ExceptionFilter,
  HttpException,
  ArgumentsHost,
} from '@nestjs/common';

import { Request, Response } from 'express';

@Catch()
export class HttpFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();
    console.log(exception);
    const status = exception.getStatus?.();
    response.status(status).json({
      success: false,
      time: new Date().toLocaleString(),
      message: exception.message,
      path: request.url,
      exception,
      status,
    });
  }
}
