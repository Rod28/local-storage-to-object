/**
 * To review the configuration of this file, as well as add or delete properties,
 * consult the following link.
 *
 * @see https://eslint.org/docs/latest/user-guide/configuring/configuration-files
 */
module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es2021: true,
    jest: true
  },
  parser: '@typescript-eslint/parser',
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
  plugins: ['prettier'],
  rules: {
    '@typescript-eslint/no-explicit-any': 'off'
  },
  ignorePatterns: ['node_modules', 'coverage', 'testing', 'dist', '.githooks']
};
