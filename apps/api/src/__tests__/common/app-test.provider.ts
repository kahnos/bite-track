import { INestApplication, ModuleMetadata, ValidationPipe } from '@nestjs/common';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { Test, TestingModule, TestingModuleBuilder } from '@nestjs/testing';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

import { ApiException } from '@/common/exceptions/api-exception';
import { GlobalExceptionFilter } from '@/common/exceptions/global-exception.filter';
import { RequestLoggerInterceptor } from '@/common/interceptors/logger.interceptor';

/**
 * Provides the test application, using during integration (e2e) tests in NestJS.
 */
export class TestNestAppProvider {
  /**
   * Active test application.
   */
  app!: NestFastifyApplication;

  /**
   * Active test module.
   */
  testModule!: TestingModule;

  /**
   * Initializes the test application and module.
   */
  public async initApp(params: {
    moduleMetadata: ModuleMetadata;
    showAppLogs?: boolean;
    overrideTestModuleCallback?: (builder: TestingModuleBuilder) => void;
    initAppCallback?: (app: INestApplication) => void;
  }): Promise<INestApplication> {
    const { moduleMetadata, overrideTestModuleCallback, initAppCallback, showAppLogs = false } = params;

    this.testModule = await this._createTestingModule(moduleMetadata, overrideTestModuleCallback);
    await this._initTestApp({ showAppLogs, initAppCallback });

    return this.app;
  }

  /**
   * Closes the test application.
   */
  public async closeApp(): Promise<void> {
    if (this.app) {
      await this.app.close();
    }
    if (this.testModule) {
      await this.testModule.close();
    }
  }

  /**
   * Initializes the test application, including middlewares.
   */
  _initTestApp = async (params: {
    showAppLogs?: boolean;
    initAppCallback?: (app: INestApplication) => void;
  }): Promise<void> => {
    const { showAppLogs = false, initAppCallback } = params;

    this.app = this.testModule.createNestApplication<NestFastifyApplication>(new FastifyAdapter());

    // ===== Monitoring =====
    if (showAppLogs) {
      const logger = this.app.get(WINSTON_MODULE_NEST_PROVIDER);
      this.app.useLogger(logger);

      // Log all requests
      this.app.useGlobalInterceptors(new RequestLoggerInterceptor(logger));
    }

    // ===== Filters =====
    this.app.useGlobalFilters(new GlobalExceptionFilter());

    // ===== Pipes =====
    this.app.useGlobalPipes(
      new ValidationPipe({
        transform: true,
        whitelist: true,
        forbidNonWhitelisted: true,
        exceptionFactory: ApiException.fromValidationError,
      }),
    );

    if (initAppCallback) {
      initAppCallback(this.app);
    }

    await this.app.init();
    await this.app.getHttpAdapter().getInstance().ready();
  };

  /**
   * Creates a testing module.
   * @param moduleMetadata Module metadata to use when creating module, like imports, controllers, providers, etc.
   * @param mockRedis Whether to mock the Redis provider.
   * @param overrideTestModuleCallback Callback to override the test module.
   * @returns Testing module.
   */
  _createTestingModule = (
    moduleMetadata: ModuleMetadata,
    overrideTestModuleCallback?: (builder: TestingModuleBuilder) => void,
  ): Promise<TestingModule> => {
    const testModule = Test.createTestingModule(moduleMetadata);

    if (overrideTestModuleCallback) {
      overrideTestModuleCallback(testModule);
    }

    return testModule.compile();
  };
}
