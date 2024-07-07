const { resolve } = require('node:path');

const project = resolve(process.cwd(), 'tsconfig.json');

/*
 * This is a custom ESLint configuration for use a library
 * that utilizes React.
 *
 * This config extends the Vercel Engineering Style Guide.
 * For more information, see https://github.com/vercel/style-guide
 *
 */

module.exports = {
  extends: [
    '@vercel/style-guide/eslint/browser',
    '@vercel/style-guide/eslint/typescript',
    '@vercel/style-guide/eslint/react',
    'eslint-config-turbo',
    'plugin:storybook/recommended',
  ].map(require.resolve),
  parserOptions: {
    project,
  },
  globals: {
    JSX: true,
  },
  plugins: ['only-warn'],
  parser: '@typescript-eslint/parser',
  settings: {
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,
        project: ['packages/*/tsconfig.json', 'apps/*/tsconfig.json'],
      },
      webpack: {
        config: {
          resolve: {
            alias: {
              '@': path.resolve(__dirname, './src'),
            },
            extensions: ['.js', '.jsx', '.ts', '.tsx'],
          },
        },
      },
    },
    react: {
      version: 'detect',
    },
  },
  overrides: [
    // Force ESLint to detect .tsx files
    { files: ['*.js?(x)', '*.ts?(x)'] },
    {
      files: ['**/__tests__/**/*'],
      env: {
        jest: true,
      },
      plugins: ['jest'],
    },
  ],
  ignorePatterns: ['node_modules/', 'dist/', '.eslintrc.js', '**/*.css'],
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
