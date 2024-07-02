import type { Config } from 'jest'

const config: Config = {
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: './src/tests/coverage',
  coverageProvider: 'v8',
  testEnvironment: '<rootDir>/src/tests/environments/jest.environment.ts',
  transform: {
    '\\.[jt]sx?$': 'babel-jest'
  }
}

export default config
