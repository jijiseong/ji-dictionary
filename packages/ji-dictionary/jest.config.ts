import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  verbose: true,
  rootDir: '.',

  testEnvironment: 'node',
  resetMocks: true,
  clearMocks: true,
};

export default config;
