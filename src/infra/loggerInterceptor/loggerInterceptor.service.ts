/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { WinstonLoggerService } from './../logger/logger.service';
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, tap, catchError } from 'rxjs';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(private readonly logger: WinstonLoggerService) {
    this.logger = new WinstonLoggerService('Request');
  }

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest();
    const res = context.switchToHttp().getResponse();

    const method = req.method;
    const url = req.originalUrl || req.url;
    const start = Date.now();

    return next.handle().pipe(
      tap(() => {
        const duration = Date.now() - start;
        const statusCode = res.statusCode;

        this.logger.log(`${method} ${url} ${statusCode} - ${duration}ms`);
      }),
      catchError((error: unknown) => {
        const duration = Date.now() - start;
        const statusCode = res.statusCode || 500;
        // casting error to Error here
        this.logger.error(
          `${method} ${url} ${statusCode} - ${duration}ms`,
          error as Error,
        );

        throw error;
      }),
    );
  }
}
