import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { WinstonLoggerService } from './infra/logger/logger.service';
import { LoggingInterceptor } from './infra/loggerInterceptor/loggerInterceptor.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = app.get(WinstonLoggerService);
  app.useGlobalInterceptors(new LoggingInterceptor(logger));
  const configService = app.get(ConfigService);
  const port = configService.get<number>('port') || 3000;
  await app.listen(port);
  logger.log(`Microservice is running on port ${port}`, `Bootstrap`);
}

bootstrap();
