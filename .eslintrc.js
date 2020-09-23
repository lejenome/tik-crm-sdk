module.exports = {
  root: true,
  env: {
    browser: true,
    // node: true,
    es2020: true,
  },
  parserOptions: {
    parser: 'babel-eslint',
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: {
      impliedStrict: true,
    },
  },

  extends: ['eslint:recommended', 'prettier', 'plugin:prettier/recommended'],
  plugins: ['prettier'],
  // add your custom rules here
  rules: {
    // "require-await": "off",
    'prettier/prettier': 'warn',

    'no-console': 'off',
    camelCase: 'off',
    camelcase: 'off',
    // "no-var": "off",

    quotes: ['off', 'double'],
    indent: 'off',
    'no-unreachable': 'error',

    // '@typescript-eslint/no-unused-vars': 'off',
    'no-unused-vars': 'error',
    'prefer-promise-reject-errors': 'warn',
    'prefer-const': 'error',
    'no-return-await': 'warn',
    'max-len': 'off',
    'no-new': 'off',
    'no-lonely-if': 'off',
    'import/order': 'off',
    'require-await': 'warn',
    'import/no-webpack-loader-syntax': 'off',
  },
}
