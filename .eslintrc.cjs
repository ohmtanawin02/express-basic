module.exports = {
  root: true,
  env: {
    es6: true,
    node: true
  },
  extends: [
    'eslint:recommended'
  ],
  rules: {
    'max-len': ['error', {
      code: 150,
      tabWidth: 2,
      ignoreUrls: true,
      ignoreRegExpLiterals: true,
      ignoreComments: true,
      ignoreTrailingComments: true,
      ignoreStrings: true
    }],
    'radix': ['error', 'as-needed'],
    'template-curly-spacing': 'off',
    'no-unused-vars': ['warn'],
    'indent': ['error', 2], // dynamic require
    'no-plusplus': 'off',
    'no-console': process.env.NODE_ENV === 'production' ? ['error', { allow: ['warn', 'error'] }] : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? ['error'] : 'off',
    'comma-dangle': ['error', 'never'],
    'semi': ['error', 'never'],
    'quote-props': ['error', 'consistent-as-needed'],
    'import/no-unresolved': 'off',
    'space-before-function-paren': ['error', 'always'],
    'object-curly-newline': 'off',
    'no-underscore-dangle': 'off',
    'no-shadow': ['error', { allow: ['state'] }],
    'prefer-destructuring': ['error', { object: true, array: false }],
    'no-param-reassign': ['error', {
      props: true,
      ignorePropertyModificationsFor: [
        'acc', // for reduce accumulators
        'state',
        'el',
        'req',
        'res'
      ]
    }],
    'no-restricted-syntax': ['error', 'ForInStatement', 'LabeledStatement', 'WithStatement'],
    'no-bitwise': ['error', { int32Hint: true }],
    'import/extensions': [0, { '<js>': 'always' }],
    'consistent-return': 'off'
  },
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  }
}
