import 'dotenv/config';

import { jest } from '@jest/globals';
import { INestApplication, ValidationPipe } from '@nestjs/common';

import { ApiException } from '@/common/exceptions/api-exception';

import { TestNestAppProvider } from './common/app-test.provider';
import { coreImports, mobileImports } from '@/app.module';

global.jest = jest;

// ===== JEST =====
const testTimeout = 300000;
jest.setTimeout(testTimeout);

let mobileTestAppProvider: TestNestAppProvider;
beforeAll(async () => {
  // Create the test app
  mobileTestAppProvider = new TestNestAppProvider();
  await mobileTestAppProvider.initApp({
    moduleMetadata: {
      imports: [...coreImports, ...mobileImports()],
    },
    initAppCallback: (app: INestApplication) => {
      //   app.useGlobalFilters(new GlobalExceptionFilter());

      // Transform and Validator Pipes
      app.useGlobalPipes(
        new ValidationPipe({
          transform: true,
          whitelist: true,
          forbidNonWhitelisted: true,
          exceptionFactory: ApiException.fromValidationError,
        }),
      );
    },
    showAppLogs: true, // 💡 Uncomment to see app logs!
  });
});

afterAll(async () => {
  // Close db connection
  //   const dataSource = mobileTestAppProvider.app.get<DataSource>(getDataSourceToken());
  //   await dataSource.destroy();

  // Close apps
  await mobileTestAppProvider.closeApp();
});

// ===== EXPORTS =====

export { mobileTestAppProvider };
