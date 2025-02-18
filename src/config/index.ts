export interface EnvironmentVariables {
  NODE_ENV: string;
  PORT: string;
  DATABASE_URL: string;
  ACCESS_TOKEN_VALIDITY_DAYS: number;
  REFRESH_TOKEN_VALIDITY_DAYS: number;
  TOKEN_ISSUER: string;
  TOKEN_AUDIENCE: string;
  AWS_SES_HOST: string;
  AWS_SES_USERNAME: string;
  AWS_SES_PASSWORD: string;
  AWS_S3_BUCKET_NAME: string;
  AWS_ACCESS_KEY_ID: string;
  AWS_SECRET_ACCESS_KEY: string;
  AWS_S3_REGION: string;
  RESET_TOKEN_VALIDITY_HOURS: number;
  PRIVATE_KEY: string;
  PUBLIC_KEY: string;
  SYSTEM_EMAIL_ID: string;
  CLIENT_URL: string;
  LOG_DIR: string;
}

export const EnvironmentVariables = (): EnvironmentVariables => ({
  NODE_ENV: process.env.NODE_ENV || 'development',
  PORT: process.env.PORT || '3000',
  DATABASE_URL: process.env.DATABASE_URL || '',
  ACCESS_TOKEN_VALIDITY_DAYS:
    (process.env.ACCESS_TOKEN_VALIDITY_DAYS
      ? parseInt(process.env.ACCESS_TOKEN_VALIDITY_DAYS)
      : 0) *
    24 * // HOURS_IN_DAY
    60 * // MINUTES_IN_HOUR
    60, // SECONDS_IN_MINUTES
  REFRESH_TOKEN_VALIDITY_DAYS:
    (process.env.REFRESH_TOKEN_VALIDITY_DAYS
      ? parseInt(process.env.REFRESH_TOKEN_VALIDITY_DAYS)
      : 0) *
    24 * // HOURS_IN_DAY
    60 * // MINUTES_IN_HOUR
    60, // SECONDS_IN_MINUTES
  TOKEN_ISSUER: process.env.TOKEN_ISSUER || '',
  TOKEN_AUDIENCE: process.env.TOKEN_AUDIENCE || '',
  AWS_SES_HOST: process.env.AWS_SES_HOST || '',
  AWS_SES_USERNAME: process.env.AWS_SES_USERNAME || '',
  AWS_SES_PASSWORD: process.env.AWS_SES_PASSWORD || '',
  AWS_S3_BUCKET_NAME: process.env.AWS_S3_BUCKET_NAME || '',
  AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID || '',
  AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY || '',
  AWS_S3_REGION: process.env.AWS_S3_REGION || '',
  RESET_TOKEN_VALIDITY_HOURS:
    (process.env.RESET_TOKEN_VALIDITY_HOURS
      ? parseInt(process.env.RESET_TOKEN_VALIDITY_HOURS)
      : 0) *
    60 * // MINUTES_IN_HOUR
    60, // SECONDS_IN_MINUTES
  PRIVATE_KEY: process.env.PRIVATE_KEY || '',
  PUBLIC_KEY: process.env.PUBLIC_KEY || '',
  SYSTEM_EMAIL_ID: process.env.SYSTEM_EMAIL_ID || '',
  CLIENT_URL: process.env.CLIENT_URL || '',
  LOG_DIR: process.env.LOG_DIR || '',
});
