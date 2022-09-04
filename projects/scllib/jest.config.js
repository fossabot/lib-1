const { pathsToModuleNameMapper } = require('ts-jest');
const { paths } = require('../../tsconfig.json').compilerOptions;
module.exports = {
    preset: "jest-preset-angular",
    globals: {
      "ts-jest": {
        "tsconfig": "<rootDir>/tsconfig.spec.json",
        "stringifyContentPathRegex": "\\.html$"
      }
    },
    setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
    moduleFileExtensions: ['ts', 'html', 'js', 'json', 'mjs'],
    resolver: 'jest-preset-angular/build/resolvers/ng-jest-resolver.js',
    testPathIgnorePatterns: [
      "<rootDir>/node_modules/",
      "<rootDir>/dist/"
    ],
    transform: {
      '^.+\\.(ts|js|html)$': 'jest-preset-angular'
    }, 
    moduleNameMapper: pathsToModuleNameMapper(paths,
    { prefix: '<rootDir>',
      "^@Model/(.*)$": "<rootDir>/src/lib/xmlns/$1"
    }),
  roots: [
    "<rootDir>/src"
  ],
  modulePaths: [
    "<rootDir>/src/lib"
  ],
  moduleDirectories: [
    "node_modules",
  ],
  collectCoverage: true,
  coverageDirectory: './../../dist/coverage',
  coverageReporters: ['clover', 'json', 'lcov', ['text', {skipFull: true}]],
  collectCoverageFrom: [
      '<rootDir>/src/lib/**/*.ts',
      '!<rootDir>/src/lib/**/index.ts',
      '!<rootDir>/src/lib/**/module.ts',
      "!<rootDir>node_modules/**"
  ],
  testMatch: [
      '<rootDir>/src/lib/**/*.spec.ts'
  ]
}
