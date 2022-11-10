import type { ArgumentsHost, ExceptionFilter } from '@nestjs/common';
import { Catch } from '@nestjs/common';
import type { AxiosError } from 'axios';
import type { Response } from 'express';

import { LogService } from '../log';

@Catch()
export class ErrorFilter implements ExceptionFilter {
  constructor(
    private readonly logger: LogService,
  ) {
    this.logger.setContext(this.constructor.name);
  }

  public catch(error: Error, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse<Response>();

    let errorMessage: string = error.message || error as unknown as string;
    let errorStack: string = error.stack || '';
    let resStatus = 500;

    if (this.isAxiosError(error)) {
      errorMessage = error.response?.data.message || '';
      errorStack = error.response?.data.stack || '';
      resStatus = error.response?.status || 500;
    }

    const responseResult: any = { message: errorMessage };

    if (process.env.NODE_ENV === 'dev') {
      responseResult.stack = errorStack;
    }

    return response.status(resStatus).send(responseResult);
  }

  private isAxiosError(error: any): error is AxiosError<{ message: string, stack: string }, any> {
    return error.isAxiosError;
  }
}
