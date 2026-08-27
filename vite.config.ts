import { defineConfig } from 'vite-plus';

/** Generated or vendored code that must never be linted or formatted. */
const generated = [
  '**/.adonisjs/**',
  'backend/build/**',
  'backend/tmp/**',
  'backend/database/schema.ts',
];

export default defineConfig({
  staged: {
    '*': 'vp check --fix',
  },
  lint: {
    ignorePatterns: generated,
    options: { typeAware: true, typeCheck: true },
    overrides: [
      {
        // Rules carried over from @adonisjs/eslint-config.
        files: ['backend/**/*.ts'],
        rules: {
          curly: ['error', 'all'],
          eqeqeq: ['error', 'always'],
          'unicorn/filename-case': ['error', { case: 'snakeCase' }],
          'unicorn/prefer-node-protocol': 'error',
          'unicorn/no-await-expression-member': 'error',
          'unicorn/no-instanceof-builtins': 'error',
          'unicorn/prefer-number-properties': 'error',
        },
      },
    ],
  },
  fmt: {
    ignorePatterns: generated,
    singleQuote: true,
  },
});
