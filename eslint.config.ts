// import tsEslintPlugin from '@typescript-eslint/eslint-plugin';
// import tsEslintParser from '@typescript-eslint/parser';

// export default [
//   {
//     ignores: ['node_modules/', 'dist/'],
//   },
//   {
//     files: ['**/*.ts'],
//     languageOptions: {
//       ecmaVersion: 'latest',
//       parser: tsEslintParser,
//       sourceType: 'module',
//       globals: {
//         process: 'readonly',
//       },
//     },
//     plugins: {
//       '@typescript-eslint': tsEslintPlugin,
//     },
//     rules: {
//       'no-unused-vars': 'error',
//       'no-unused-expressions': 'error',
//       'prefer-const': 'error',
//       'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'warn',
//       'no-undef': 'error',
//       '@typescript-eslint/no-unused-vars': [
//         'error',
//         { argsIgnorePattern: '^_' },
//       ],
//     },
//   },
// ];
