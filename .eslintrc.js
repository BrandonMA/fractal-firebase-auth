module.exports = {
    root: true,
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint'],
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
        'prettier',
        'standard',
        'standard-react',
        'plugin:prettier/recommended',
        'prettier/standard',
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
    }
};
