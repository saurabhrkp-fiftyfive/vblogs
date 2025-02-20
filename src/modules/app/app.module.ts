import { LoggerModule } from '../../infra/logger/logger.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from '../../infra/database/database.module';
import { AppConfigModule } from '../../config/config.module';
import { AwsS3Module } from '../../infra/s3/s3.module';
import { UsersModule } from '../users/users.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    AppConfigModule,
    LoggerModule,
    DatabaseModule,
    AwsS3Module,
    UsersModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
