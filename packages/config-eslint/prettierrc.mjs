import vercelPrettierConfig from '@vercel/style-guide/prettier';

export default {
  ...vercelPrettierConfig,
  parser: 'babel-ts', // use 'babel typescript' parser
  printWidth: 120, // max 120 chars in line
  importOrder: [
    '<BUILTIN_MODULES>', // Node.js built-in modules
    '', // Empty line
    '<THIRD_PARTY_MODULES>', // Imports not matched by other special words or groups.
    '', // Empty line
    '^@/(packages|features|common||shared|controllers|modules)/(.*)$', // Internal imports - high level
    '', // Empty line
    '^@/(components|enums|hooks|assets|layouts|lib|pages|providers|router|translations|types|utils)/(.*)$', // Internal imports - low level
    '', // Empty line
    '^../(.*)$', // Parent imports
    '', // Empty line
    '^./(.*)$', // Relative imports
  ],
  importOrderParserPlugins: ['typescript', 'jsx', 'decorators-legacy'],
  importOrderTypeScriptVersion: '5.4.5',
  tailwindFunctions: ['clsx'],
  plugins: [
    'prettier-plugin-tailwindcss',
    '@ianvs/prettier-plugin-sort-imports',
  ],
  overrides: [
    {
      files: '*.css',
      options: { parser: 'css' },
    },
    {
      files: '*.json',
      options: { parser: 'json' },
    },
  ],
};
