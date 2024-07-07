import type { Config } from 'jest';

const baseConfig: Config = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  preset: 'ts-jest',
  rootDir: '..',
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  collectCoverageFrom: ['**/*.(t|j)s'],
  coverageDirectory: './coverage',
  testEnvironment: 'node',
  moduleNameMapper: {
    '#node-web-compat': './node-web-compat-node.js',
    '^@/(.*)$': ['<rootDir>/$1'],
  },
  verbose: true,
};

export default baseConfig;
