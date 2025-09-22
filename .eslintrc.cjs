module.exports = {
    parser: '@typescript-eslint/parser', // TypeScript Parser
    parserOptions: {
      ecmaVersion: 2021,
      sourceType: 'module',
      ecmaFeatures: { jsx: true },
    },
    settings: {
      react: { version: 'detect' },
    },
    env: {
      browser: true,
      es2021: true,
    },
    extends: [
      'eslint:recommended',                   
      'plugin:@typescript-eslint/recommended',
      'plugin:react/recommended',      
      'plugin:react-hooks/recommended',
      'plugin:prettier/recommended',
    ],
    plugins: ['@typescript-eslint', 'react', 'react-hooks', 'prettier'],
    rules: {}
}

  