import { LoggerModule } from '../../infra/logger/logger.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from '../../infra/database/database.module';
import { AppConfigModule } from '../../config/config.module';
import { AwsS3Module } from '../../infra/s3/s3.module';

@Module({
  imports: [AppConfigModule, LoggerModule, DatabaseModule, AwsS3Module],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
