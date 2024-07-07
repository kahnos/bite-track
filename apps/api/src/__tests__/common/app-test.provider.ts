import { INestApplication, ModuleMetadata } from '@nestjs/common';
import { Test, TestingModule, TestingModuleBuilder } from '@nestjs/testing';

/**
 * Provides the test application, using during integration (e2e) tests in NestJS.
 */
export class TestNestAppProvider {
  /**
   * Active test application.
   */
  app!: INestApplication;

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
    this.app = await this._initTestApp({ showAppLogs, initAppCallback });

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
  }): Promise<INestApplication> => {
    const { showAppLogs = false, initAppCallback } = params;

    this.app = this.testModule.createNestApplication();

    if (initAppCallback) {
      initAppCallback(this.app);
    }

    return await this.app.init();
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
