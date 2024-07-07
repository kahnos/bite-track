import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus, Logger } from '@nestjs/common';
import { FastifyReply } from 'fastify';

/**
 * GlobalExceptionFilter
 *
 * Global exception filter for handling all uncaught exceptions.
 */
@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  private readonly _logger = new Logger(GlobalExceptionFilter.name);

  catch(exception: any, host: ArgumentsHost) {
    const ctx = host?.switchToHttp();
    const response = ctx?.getResponse<FastifyReply>();
    const { message, status } = exception;

    this._logger.error({
      context: GlobalExceptionFilter.name,
      message,
      data: exception,
    });

    response.status(status ?? HttpStatus.INTERNAL_SERVER_ERROR).send(exception);
  }
}
