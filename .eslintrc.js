module.exports = {
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint', 'promise'],
    extends: [
        'prettier',
        'eslint:recommended',
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:prettier/recommended',
        'plugin:promise/recommended',
        'prettier/standard',
        'standard-react',
        'plugin:react/recommended',
        'prettier/react',
        'plugin:react-hooks/recommended'
    ],
    env: {
        es6: true,
        webextensions: true,
        browser: true
    },
    parserOptions: {
        ecmaVersion: 2020,
        ecmaFeatures: {
            legacyDecorators: true,
            jsx: true
        }
    },
    settings: {
        react: {
            version: '16.13.1'
        }
    },
    rules: {
        'no-prototype-builtins': 'off',
        'react/jsx-handler-names': 'off',
        'react/display-name': 'off',
        '@typescript-eslint/no-explicit-any': 'off'
    }
};
