import {
  Injectable,
  OnModuleInit,
  OnApplicationShutdown,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import mongoose, { Connection } from 'mongoose';
import { WinstonLoggerService } from '../logger/logger.service';

@Injectable()
export class DatabaseService implements OnModuleInit, OnApplicationShutdown {
  private connection: Connection;

  constructor(
    private readonly configService: ConfigService,
    private readonly logger: WinstonLoggerService,
  ) {
    this.logger = new WinstonLoggerService(DatabaseService.name);
  }
  async onModuleInit() {
    try {
      const databaseURI = this.configService.get<string>('databaseURI');
      // Check if databaseURI is undefined before passing it to mongoose.connect
      if (databaseURI) {
        await mongoose.connect(databaseURI);
        this.connection = mongoose.connection;
        this.logger.log('Database connected successfully.');
      } else {
        this.logger.error('Database URI is undefined.');
      }
    } catch (error: unknown) {
      this.logger.error('Database connection failed', error as Error);
    }
  }

  async onApplicationShutdown() {
    try {
      await mongoose.disconnect();
      this.logger.log('Database disconnected gracefully.');
    } catch (error: unknown) {
      // Cast error to Error | undefined
      this.logger.error('Error during database disconnection', error as Error);
    }
  }
}
