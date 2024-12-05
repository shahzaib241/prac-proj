import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';
import { createErrorResponse } from './createApiResponse';
import { ErrorResponse } from 'src/dto/globalResponse.dto';

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();

    const errorResponse: ErrorResponse<string> = createErrorResponse(
        status,
        exception instanceof Error ? exception.message : 'Unknown Error'
    )
    response
      .status(status)
      .json(errorResponse);
  }
}   
