import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { EnvironmentVariables } from './config/index';
import { EnvironmentVariablesSchema } from './config/index';

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
export class AppModule {}
