export default () => ({
  environment: process.env.NODE_ENV || 'development',
  port: process.env.PORT || '3000',
  databaseURI: process.env.DATABASE_URI,
  tokenInfo: {
    accessTokenValidity:
      (process.env.ACCESS_TOKEN_VALIDITY_DAYS
        ? parseInt(process.env.ACCESS_TOKEN_VALIDITY_DAYS)
        : 0) *
      24 * // HOURS_IN_DAY
      60 * // MINUTES_IN_HOUR
      60, // SECONDS_IN_MINUTES
    refreshTokenValidity:
      (process.env.REFRESH_TOKEN_VALIDITY_DAYS
        ? parseInt(process.env.REFRESH_TOKEN_VALIDITY_DAYS)
        : 0) *
      24 * // HOURS_IN_DAY
      60 * // MINUTES_IN_HOUR
      60, // SECONDS_IN_MINUTES
    issuer: process.env.TOKEN_ISSUER,
    audience: process.env.TOKEN_AUDIENCE,
  },
  sesConfig: {
    host: process.env.AWS_SES_HOST,
    userName: process.env.AWS_SES_USERNAME,
    password: process.env.AWS_SES_PASSWORD,
  },
  s3Config: {
    bucket: process.env.AWS_S3_BUCKET_NAME,
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
    region: process.env.AWS_S3_REGION,
  },
  resetTokenValidity:
    (process.env.RESET_TOKEN_VALIDITY_HOURS
      ? parseInt(process.env.RESET_TOKEN_VALIDITY_HOURS)
      : 0) *
    60 * // MINUTES_IN_HOUR
    60, // SECONDS_IN_MINUTES
  keys: {
    privateKey: process.env.PRIVATE_KEY,
    publicKey: process.env.PUBLIC_KEY,
  },
  systemEmailId: process.env.SYSTEM_EMAIL_ID,
  clientURL: process.env.CLIENT_URL,
  logDirectory: process.env.LOG_DIR,
});
