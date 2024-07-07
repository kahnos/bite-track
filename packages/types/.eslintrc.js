/** @type {import("eslint").Linter.Config} */
module.exports = {
  extends: ['@bite-track/eslint-config/server.js'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: true,
  },
};
