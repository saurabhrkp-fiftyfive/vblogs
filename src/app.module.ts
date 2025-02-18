import { Module, OnModuleInit } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EnvironmentVariables } from './config/index';
import { EnvironmentVariablesSchema } from './config/index';
import { Config } from './config/variables';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [EnvironmentVariables],
      validate: (config: Record<string, unknown>): EnvironmentVariables => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const { error, value } = EnvironmentVariablesSchema.validate(config, {
          abortEarly: false,
        });
        if (error) {
          throw new Error(`Config validation error: ${error.message}`);
        }
        return value;
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements OnModuleInit {
  constructor(private readonly configService: ConfigService) {}

  onModuleInit() {
    Config.init(this.configService); // Initialize EnvConfig with ConfigService
  }
}
