module.exports = {
  preset: 'jest-preset-angular',
  setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
  collectCoverage: true,
  coverageDirectory: 'coverage',

    moduleNameMapper: {
    '^src/(.*)$': '<rootDir>/src/$1' 


    
  },
   coveragePathIgnorePatterns: [
    '/node_modules/',
    '<rootDir>/src/environments/',
    '<rootDir>/src/polyfills/',
    '<rootDir>/src/assets/',
    '\\.module\\.ts$',
    '\\.component\\.html$' // Ignora todos los archivos que terminen en .component.html
  ],

 
 
};