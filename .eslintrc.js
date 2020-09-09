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

  extends: ['prettier', 'plugin:prettier/recommended'],
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

    // '@typescript-eslint/no-unused-vars': 'off',
    'no-unused-vars': 'off',
    'prefer-promise-reject-errors': 'off',
    'prefer-const': 'off',
    'no-return-await': 'off',
    'max-len': 'off',
    'no-new': 'off',
    'no-lonely-if': 'off',
    'import/order': 'off',
    'require-await': 'warn',
    'import/no-webpack-loader-syntax': 'off',
  },
}
