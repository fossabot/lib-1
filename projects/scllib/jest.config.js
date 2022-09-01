const { pathsToModuleNameMapper } = require('ts-jest');
const { paths } = require('../../tsconfig.json').compilerOptions;

// eslint-disable-next-line no-undef
globalThis.ngJest = {
  skipNgcc: false,
  tsconfig: 'tsconfig.spec.json',
};

/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'jest-preset-angular',
  globalSetup: 'jest-preset-angular/global-setup',
  setupFilesAfterEnv: ['<rootDir>../../setup-jest.ts'],
  roots: [
    "<rootDir>",
    "<rootDir>/src/"
  ],
  modulePaths: [
    "<rootDir>",
    "<rootDir>/src/"
  ],
  moduleNameMapper: pathsToModuleNameMapper(paths, { prefix: '<rootDir>' }),
  collectCoverage: true,
  coverageDirectory: 'dist/coverage',
  coverageReporters: [ 'lcov', 'text-summary'],
  collectCoverageFrom: [
      '<rootDir>/src/lib/**/*.ts',
      '!<rootDir>/src/lib/**/index.ts',
      '!<rootDir>/src/lib/**/module.ts',
      "!<rootDir>/../../node_modules/**"
  ],
  testMatch: [
      '<rootDir>/src/lib/**/*.spec.ts'
  ]
};