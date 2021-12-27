module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$',
  reporters: ['default', ['jest-junit', { outputDirectory: 'reports' }], 'cobertura'],
  testResultsProcessor: 'jest-sonar-reporter',
};
