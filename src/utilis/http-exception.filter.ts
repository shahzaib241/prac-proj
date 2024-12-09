import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpException,
    HttpStatus,
  } from '@nestjs/common';
  import { Response } from 'express';
  
  @Catch()
  export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: unknown, host: ArgumentsHost) {
      const ctx = host.switchToHttp();
      const response = ctx.getResponse<Response>();
  
      let statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
      let message = 'Internal server error';
  
      if (exception instanceof HttpException) {
        statusCode = exception.getStatus();
        const exceptionResponse = exception.getResponse();
  
        message = typeof exceptionResponse === 'string'
          ? exceptionResponse
          : (exceptionResponse as any).message || exception.message;
  
        // if (Array.isArray(message)) {
        //   message = message[0];
        // }
      }
  
      response.status(statusCode).json({
        statusCode,
        message,
      });
    }
  }