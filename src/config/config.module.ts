import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import Configuration from './config.service';

@Module({
  imports: [ConfigModule.forRoot({ load: [Configuration] })],
  providers: [ConfigService],
  exports: [ConfigService],
})
export class AppConfigModule {}
