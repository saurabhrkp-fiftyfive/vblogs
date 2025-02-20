import {
  Injectable,
  OnModuleInit,
  OnApplicationShutdown,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
  DeleteObjectCommand,
  waitUntilBucketExists,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { WinstonLoggerService } from '../logger/logger.service';

@Injectable()
export class AwsS3Service implements OnModuleInit, OnApplicationShutdown {
  private s3Client: S3Client;
  private bucketName: string;

  constructor(
    private readonly configService: ConfigService,
    private readonly logger: WinstonLoggerService,
  ) {
    this.logger = new WinstonLoggerService(AwsS3Service.name);
  }

  async onModuleInit() {
    try {
      this.bucketName = this.configService.get<string>('s3Config.bucket') || '';

      this.s3Client = new S3Client({
        region: this.configService.get<string>('s3Config.region'),
        credentials: {
          accessKeyId:
            this.configService.get<string>(
              's3Config.credentials.accessKeyId',
            ) || '',
          secretAccessKey:
            this.configService.get<string>(
              's3Config.credentials.secretAccessKey',
            ) || '',
        },
      });

      await waitUntilBucketExists(
        { client: this.s3Client, maxWaitTime: 100 },
        {
          Bucket: this.bucketName,
        },
      );

      this.logger.log('AWS S3 client initialized.');
    } catch (error: unknown) {
      this.logger.error('AWS S3 initialization failed', error as Error);
    }
  }

  async uploadFile(key: string, body: Buffer, contentType: string) {
    try {
      const command = new PutObjectCommand({
        Bucket: this.bucketName,
        Key: key,
        Body: body,
        ContentType: contentType,
      });

      await this.s3Client.send(command);
      this.logger.log(`File uploaded to S3: ${this.bucketName}/${key}`);
      return { key };
    } catch (error: unknown) {
      this.logger.error('File upload failed', error as Error);
      throw error;
    }
  }

  async getFile(key: string) {
    try {
      const command = new GetObjectCommand({
        Bucket: this.bucketName,
        Key: key,
      });

      const response = await this.s3Client.send(command);
      this.logger.log(`File retrieved from S3: ${this.bucketName}/${key}`);
      return response;
    } catch (error: unknown) {
      this.logger.error('Error retrieving file', error as Error);
      throw error;
    }
  }

  async deleteFile(key: string) {
    try {
      const command = new DeleteObjectCommand({
        Bucket: this.bucketName,
        Key: key,
      });

      await this.s3Client.send(command);
      this.logger.log(`File deleted from S3: ${this.bucketName}/${key}`);
    } catch (error: unknown) {
      this.logger.error('Error deleting file', error as Error);
      throw error;
    }
  }

  async getSignedUrl(key: string, expiresInSeconds = 3600): Promise<string> {
    try {
      const command = new GetObjectCommand({
        Bucket: this.bucketName,
        Key: key,
      });

      const url: string = await getSignedUrl(this.s3Client, command, {
        expiresIn: expiresInSeconds,
      });

      this.logger.log(`Generated signed URL for: ${this.bucketName}/${key}`);
      return url;
    } catch (error: unknown) {
      this.logger.error('Error generating signed URL', error as Error);
      throw error;
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onApplicationShutdown(_signal?: string) {
    this.s3Client.destroy();
    this.logger.log('AWS S3 service shutdown.');
  }
}
