import { Injectable } from '@nestjs/common';
import { WinstonLoggerService } from './infra/logger/logger.service';

@Injectable()
export class AppService {
  constructor(private readonly logger: WinstonLoggerService) {
    this.logger.setContext(AppService.name);
  }

  getHello(): string {
    this.logger.log('Hello World!');
    return 'Hello World!';
  }
}
