import { Test, TestingModule } from '@nestjs/testing';
import { DatabaseService } from './database.service';
import { ConfigService } from '@nestjs/config';
import mongoose from 'mongoose';

describe('DatabaseService', () => {
  let service: DatabaseService;
  let configService: ConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DatabaseService,
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn(() => 'mongodb://test-uri'),
          },
        },
      ],
    }).compile();

    service = module.get<DatabaseService>(DatabaseService);
    configService = module.get<ConfigService>(ConfigService);
  });

  afterEach(() => {
    jest.clearAllMocks(); // Clear all mocks after each test
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('onModuleInit', () => {
    it('should connect to the database successfully', async () => {
      const mongooseConnectSpy = jest
        .spyOn(mongoose, 'connect')
        .mockResolvedValueOnce(mongoose);

      await service.onModuleInit();

      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(configService.get).toHaveBeenCalledWith('DATABASE_URI');
      expect(mongooseConnectSpy).toHaveBeenCalledWith('mongodb://test-uri');
    });

    it('should log an error if connection fails', async () => {
      const error = new Error('Connection failed');
      jest.spyOn(mongoose, 'connect').mockRejectedValueOnce(error);
      const loggerErrorSpy = jest.spyOn(service['logger'], 'error');

      await service.onModuleInit();

      expect(loggerErrorSpy).toHaveBeenCalledWith(
        'Database connection failed',
        error,
      );
    });
  });

  describe('onApplicationShutdown', () => {
    it('should disconnect from the database gracefully', async () => {
      const mongooseDisconnectSpy = jest
        .spyOn(mongoose, 'disconnect')
        .mockResolvedValueOnce(undefined);

      await service.onApplicationShutdown();

      expect(mongooseDisconnectSpy).toHaveBeenCalled();
    });

    it('should log an error if disconnection fails', async () => {
      const error = new Error('Disconnection failed');
      jest.spyOn(mongoose, 'disconnect').mockRejectedValueOnce(error);
      const loggerErrorSpy = jest.spyOn(service['logger'], 'error');

      await service.onApplicationShutdown();

      expect(loggerErrorSpy).toHaveBeenCalledWith(
        'Error during database disconnection',
        error,
      );
    });
  });
});
