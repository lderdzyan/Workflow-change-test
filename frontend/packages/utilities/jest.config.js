/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.tsx?$": ["ts-jest", {}],
  },
  coverageProvider: "babel",
  coverageDirectory: "<rootDir>/coverage",
  collectCoverage: true,
  reporters: ["default", ["jest-ctrf-json-reporter", {}]],
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
};
