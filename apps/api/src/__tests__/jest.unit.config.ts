import type { Config } from 'jest';

import baseConfig from './jest-base.config';

const config: Config = {
  ...baseConfig,
  testRegex: '/.*\\.unit-spec\\.ts$',
};

export default config;
