import { CallHandler, ExecutionContext, Inject, Injectable, LoggerService, NestInterceptor } from '@nestjs/common';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

/**
 * LoggerInterceptor
 *
 * @description An interceptor that logs incoming requests and outgoing responses.
 */
@Injectable()
export class RequestLoggerInterceptor implements NestInterceptor {
  constructor(
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly _logger: LoggerService,
  ) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const method = request.method;
    const url = request.url;
    const params = request.params;
    const query = request.query;
    const body = request.body;

    this._logger.log({
      message: `🌞 Incoming request`,
      data: {
        route: `${method} ${url}`,
        params,
        query,
        body,
      },
    });

    const now = Date.now();

    return next.handle().pipe(
      map((data) => {
        this._logger.log({
          message: '🌚 Outgoing response',
          data: {
            route: `${method} ${url}`,
            params,
            query,
            body,
            output: data,
            time: `${Date.now() - now}ms`,
          },
        });
        return data;
      }),
    );
  }
}
