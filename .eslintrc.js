module.exports = {
    extends: ['eslint:recommended', 'plugin:prettier/recommended'],
    env: {
        browser: false,
        es6: true,
        browser: true
    },
    parser: 'babel-eslint',
    parserOptions: {
        ecmaVersion: 6,
        sourceType: 'module',
        ecmaFeatures: {
            jsx: true
        }
    },
    settings: {
        react: {
            version: 'detect'
        }
    },
    rules: {
        'prettier/prettier': ['error', require('./.prettierrc')],
        'no-unused-vars': 'off',
        'no-undef': 'off'
    }
}