/* eslint-disable @typescript-eslint/no-base-to-string */
import {
  Injectable,
  Scope,
  LoggerService,
  OnModuleDestroy,
} from '@nestjs/common';
import {
  createLogger,
  format,
  transports,
  Logger,
  LoggerOptions,
} from 'winston';
import { TransformableInfo } from 'logform';

@Injectable({ scope: Scope.DEFAULT }) // Ensures Singleton instance
// Notice that we allow an optional context parameter in the constructor
export class WinstonLoggerService implements LoggerService, OnModuleDestroy {
  private readonly logger: Logger;
  private context = 'Application'; // Default context

  constructor(context?: string) {
    // Set a default context if none is provided.
    this.context = context || 'Application';

    const consoleTransports = new transports.Console({
      format: format.combine(
        format.errors({ stack: true }),
        format.timestamp({ format: 'DD/MM/YYYY, h:mm:ss A' }),
        // Use the passed context if available; otherwise fall back to this.context.
        format.printf((info: TransformableInfo) => {
          const { level, message, timestamp, context, stack } = info;
          // Cast each variable to a string using String()
          const logTimestamp = String(timestamp);
          const logLevel = String(level).toUpperCase();
          const logMessage = String(message);
          const logContext = context ? String(context) : this.context;

          if (stack)
            return `[Nest] ${process.pid}  - ${logTimestamp}    ${logLevel} [${logContext}] ${logMessage}\n${String(stack)}`; // Custom format for error logs
          // Use the passed context if available; otherwise fall back to this.context (cast to string)
          return `[Nest] ${process.pid}  - ${logTimestamp}    ${logLevel} [${logContext}] ${logMessage}`;
        }),
      ),
    });

    const loggerOptions: LoggerOptions = {
      transports: consoleTransports,
      exceptionHandlers: consoleTransports,
      exitOnError: false,
    };

    this.logger = createLogger(loggerOptions);
  }

  /** ✅ Set context dynamically per service (without creating a new instance) */
  setContext(context: string) {
    this.context = context;
  }

  private formatMessage(message: any): string {
    return typeof message === 'object'
      ? JSON.stringify(message, null, 2)
      : String(message);
  }

  log(message: any, context?: string) {
    this.logger.info(this.formatMessage(message), {
      context: context || this.context,
    });
  }

  error(message: string, error?: Error, context?: string) {
    this.logger.error(this.formatMessage(message), {
      context: context || this.context,
      stack: error?.stack,
    });
  }

  warn(message: any, context?: string) {
    this.logger.warn(this.formatMessage(message), {
      context: context || this.context,
    });
  }

  debug(message: any, context?: string) {
    this.logger.debug(this.formatMessage(message), {
      context: context || this.context,
    });
  }

  verbose(message: any, context?: string) {
    this.logger.verbose(this.formatMessage(message), {
      context: context || this.context,
    });
  }

  /** ✅ Proper cleanup on shutdown */
  onModuleDestroy() {
    this.logger.end(); // Ensures proper resource cleanup
  }
}
