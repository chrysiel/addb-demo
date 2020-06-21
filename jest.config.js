module.exports = {
  // Automatically clear mock calls and instances between every test
  clearMocks: true,

  collectCoverage: true,
  collectCoverageFrom: ['**/*.{js,vue}', '!**/node_modules/**'],
  coverageReporters: ['html', 'text-summary'],

  coverageDirectory: 'coverage',

  // An array of regexp pattern strings used to skip coverage collection
  coveragePathIgnorePatterns: ['<rootDir>/node_modules/(?!@foo)'],

  globals: {
    'ts-jest': {
      tsConfig: 'tsconfig.json',
      diagnostics: true
    }
  },

  moduleFileExtensions: ['js', 'ts', 'json', 'vue'],

  // A map from regular expressions to module names that allow to stub out resources with a single module
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
    '^~/(.*)$': '<rootDir>/$1'
  },

  testEnvironment: 'node',

  testRegex: '(/tests/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$',

  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
    // process `*.vue` files with `vue-jest`
    '.*\\.(vue)$': 'vue-jest',
    // process js with `babel-jest`
    '^.+\\.js$': '<rootDir>/node_modules/babel-jest'
  },

  transformIgnorePatterns: ['<rootDir>/node_modules/(?!@foo)'],

  snapshotSerializers: ['jest-serializer-vue']
}
