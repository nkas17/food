module.exports = {
  parserOptions: {
    project: './tsconfig.json',
  },
  plugins: ['@typescript-eslint', 'testing-library', 'jest-dom'],
  extends: [
    'airbnb',
    'prettier',
    'airbnb-typescript',
    'plugin:testing-library/react',
    'plugin:jest-dom/recommended',
  ],
  env: {
    browser: true,
    commonjs: true,
    node: true,
    jest: true,
  },
  rules: {
    'react/require-default-props': 'off',
    'react/forbid-prop-types': 'off',
    'react/jsx-one-expression-per-line': 'off',
    'no-plusplus': 'off',
    'no-underscore-dangle': 'off',
    'jsx-a11y/label-has-for': 'off',
    'import/prefer-default-export': 'off',
    '@typescript-eslint/indent': 'off',

    quotes: [
      'error',
      'single',
      {
        allowTemplateLiterals: true,
      },
    ],
  },
};
