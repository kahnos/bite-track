import type { Config } from 'jest';

import baseConfig from './jest-base.config';

const config: Config = {
  ...baseConfig,
  testRegex: '/.*\\.integration-spec\\.ts$',
  testTimeout: 600000,
  setupFilesAfterEnv: ['./jest.setup.ts'],
};

export default config;
