export const testEnvironment = 'node';
export const testPathIgnorePatterns = ['/node_modules/'];
export const testMatch = ['**/?(*.)+(test).ts'];
export const moduleFileExtensions = ['ts', 'js', 'json'];
export const moduleNameMapper = {
  '^axios$': require.resolve('axios'),
};
export const restoreMocks = true;
export const resetMocks = true;
export const moduleDirectories = ['node_modules', '<rootDir>/src'];
export const transform = {
  '^.+\\.ts?$': 'ts-jest',
};
