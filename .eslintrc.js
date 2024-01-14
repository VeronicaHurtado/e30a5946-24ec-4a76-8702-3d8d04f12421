module.exports = {
    env: {
        commonjs: true
    },
    extends: [
        'eslint:recommended', 'plugin:n/recommended', 'plugin:promise/recommended'
    ],
    overrides: [
        {
            env: {
                node: true
            },
            files: [
                '.eslintrc.{js,cjs}'
            ],
            parserOptions: {
                sourceType: 'script'
            }
        },
        {
            files: [
                '**/*.test.js'
            ],
            env: {
                jest: true
            },
            plugins: ['jest'],
            rules: {
                'jest/no-disabled-tests': 'warn',
                'jest/no-focused-tests': 'error',
                'jest/no-identical-title': 'error',
                'jest/prefer-to-have-length': 'warn',
                'jest/valid-expect': 'error',
                'promise/always-return': 'off'
            }
        }
    ],
    parserOptions: {
        ecmaVersion: 'latest'
    },
    plugins: [
        '@stylistic/js'
    ],
    rules: {
        '@stylistic/js/quotes': ['error', 'single', { avoidEscape: true }]
    }
}
