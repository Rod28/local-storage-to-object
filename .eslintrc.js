module.exports = {
  parser: '@typescript-eslint/parser',
  root: true,
  extends: ['eslint:recommended'],
  plugins: ['prettier'],
  overrides: [
    {
      files: ['*.js', '*.ts']
    }
  ]
};
