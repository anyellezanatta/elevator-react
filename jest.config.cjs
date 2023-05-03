/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  moduleNameMapper: {
    "\\.svg$": "<rootDir>/test-setup/svg-module.mock.ts",
    "\\.css$": "<rootDir>/test-setup/css-module.mock.ts",
    "^@/(.*)$": "<rootDir>/src/$1",
  },

  setupFilesAfterEnv: ["<rootDir>/test-setup/jest-setup.ts"],
};
