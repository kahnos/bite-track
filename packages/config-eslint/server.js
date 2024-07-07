const { resolve } = require('node:path');

const project = resolve(process.cwd(), 'tsconfig.json');

/*
 * This is a custom ESLint configuration for use server side
 * typescript packages.
 *
 * This config extends the Vercel Engineering Style Guide.
 * For more information, see https://github.com/vercel/style-guide
 *
 */

module.exports = {
  extends: ['@vercel/style-guide/eslint/node', '@vercel/style-guide/eslint/typescript', 'eslint-config-turbo'].map(
    require.resolve,
  ),
  parserOptions: {
    project,
  },
  env: {
    node: true,
    es6: true,
  },
  plugins: ['only-warn'],
  settings: {
    'import/resolver': {
      typescript: {
        project,
      },
    },
  },
  overrides: [
    // Force ESLint to detect .tsx files
    { files: ['*.js', '*.ts'] },
    {
      files: ['**/__tests__/**/*'],
      env: {
        jest: true,
      },
      plugins: ['jest'],
    },
  ],
  ignorePatterns: ['.*.js', 'node_modules/', 'dist/'],
  // add rules configurations here
  rules: {
    'import/no-default-export': 'off',
    'no-restricted-imports': [
      'error',
      {
        patterns: ['.*'],
      },
    ],
  },
};
