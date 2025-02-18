import { ConfigService } from '@nestjs/config';

export class Config {
  private static configService: ConfigService;

  static init(configService: ConfigService) {
    this.configService = configService;
  }

  static get env() {
    return {
      environment: this.configService.get<string>('NODE_ENV', 'development'),
      port: this.configService.get<number>('PORT', 3000),
      databaseURL: this.configService.get<string>('DATABASE_URI'),
      tokenInfo: {
        accessTokenValidity: this.configService.get<number>(
          'ACCESS_TOKEN_VALIDITY_DAYS',
        ),
        refreshTokenValidity: this.configService.get<number>(
          'REFRESH_TOKEN_VALIDITY_DAYS',
        ),
        issuer: this.configService.get<string>('TOKEN_ISSUER'),
        audience: this.configService.get<string>('TOKEN_AUDIENCE'),
      },
      sesConfig: {
        host: this.configService.get<string>('AWS_SES_HOST'),
        userName: this.configService.get<string>('AWS_SES_USERNAME'),
        password: this.configService.get<string>('AWS_SES_PASSWORD'),
      },
      s3Config: {
        bucket: this.configService.get<string>('AWS_S3_BUCKET_NAME'),
        config: {
          credentials: {
            accessKeyId: this.configService.get<string>('AWS_ACCESS_KEY_ID'),
            secretAccessKey: this.configService.get<string>(
              'AWS_SECRET_ACCESS_KEY',
            ),
          },
          region: this.configService.get<string>('AWS_S3_REGION'),
        },
      },
      resetTokenValidity: this.configService.get<number>(
        'RESET_TOKEN_VALIDITY_HOURS',
      ),
      keys: {
        privateKey: this.configService.get<string>('PRIVATE_KEY'),
        publicKey: this.configService.get<string>('PUBLIC_KEY'),
      },
      systemEmailId: this.configService.get<string>('SYSTEM_EMAIL_ID'),
      clientURL: this.configService.get<string>('CLIENT_URL'),
      logDirectory: this.configService.get<string>('LOG_DIR'),
    };
  }
}
