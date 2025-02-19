import { Module, Global } from '@nestjs/common';
import { WinstonLoggerService } from './logger.service';

@Global() // Makes this module globally available without needing to import in every module
@Module({
  providers: [
    {
      provide: WinstonLoggerService,
      useValue: new WinstonLoggerService(), // Provide a singleton instance of WinstonLoggerService
    },
  ],
  exports: [WinstonLoggerService], // Export WinstonLoggerService so other modules can use it
})
export class LoggerModule {}
