module.exports = {
    env: {
        browser: true,
        commonjs: true,
        es2021: true
    },
    extends: [
        'eslint:recommended'
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
        }
    ],
    parserOptions: {
        ecmaVersion: 'latest'
    },
    plugins: [
        '@stylistic/js'
    ],
    rules: {
        '@stylistic/js/indent': ['error', 4],
        '@stylistic/js/quotes': ['error', 'single', { avoidEscape: true }]
    }
}
