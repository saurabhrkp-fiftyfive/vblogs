import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import Configuration from './config/index';

@Module({
  imports: [ConfigModule.forRoot({ load: [Configuration] })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
