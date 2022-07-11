const resolver = require('eslint-config-fuks/resolver');

require('@rushstack/eslint-patch/modern-module-resolution');

module.exports = {
  extends: ['eslint-config-fuks'],
  parserOptions: {
    project: ['packages/*/tsconfig.json', 'tsconfig.packages.json'],
    sourceType: 'module',
  },
  settings: {
    'import/resolver': {
      [resolver]: {
        project: 'packages/*/tsconfig.json',
      },
    },
  },
  rules: {
    'no-console': ['off'],
    'jsdoc/require-jsdoc': ['off']
  },
  overrides: [
    {
      files: ['*.json'],
      parserOptions: {
        project: false,
      },
      rules: {
        indent: ['error', 2],
      },
    },
  ],
};
