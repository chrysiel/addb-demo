module.exports = {
  // preset: '@vue/cli-plugin-unit-jest/presets/no-babel'
  preset: 'jest-puppeteer',
  globals: {
    URL: 'http://localhost:8080'
  },
  testMatch: ['**/tests/**/*.spec.ts'],
  verbose: true
}
