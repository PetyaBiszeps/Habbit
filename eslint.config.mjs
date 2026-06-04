import reactRefresh from 'eslint-plugin-react-refresh'
import reactHooks from 'eslint-plugin-react-hooks'
import stylistic from '@stylistic/eslint-plugin'
import tseslint from 'typescript-eslint'
import globals from 'globals'

export default [{
  ignores: ['node_modules/**', 'public/**', 'dist/**', 'out/**']
}, ...tseslint.configs.recommended, {
  files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
  rules: {
    ...reactHooks.configs.recommended.rules,

    'no-console': 'warn',
    'no-unreachable': 'error',
    'curly': ['error', 'all'],
    'semi': ['error', 'never'],
    'quotes': ['error', 'single'],
    'no-implicit-coercion': 'error',
    'no-useless-assignment': 'error',
    'preserve-caught-error': 'error',
    'comma-dangle': ['error', 'never'],
    'eqeqeq': ['error', 'always', {
      null: 'ignore'
    }],

    '@stylistic/indent': ['error', 2],
    '@stylistic/semi': ['error', 'never'],
    '@stylistic/quotes': ['error', 'single'],
    '@stylistic/eol-last': ['error', 'always'],
    '@stylistic/brace-style': ['error', '1tbs'],
    '@stylistic/comma-dangle': ['error', 'never'],
    '@stylistic/object-curly-spacing': ['error', 'always'],
    '@stylistic/quote-props': ['error', 'consistent-as-needed'],
    '@stylistic/key-spacing': ['error', {
      beforeColon: false,
      afterColon: true
    }],
    '@stylistic/comma-spacing': ['error', {
      before: false,
      after: true
    }],
    '@stylistic/arrow-spacing': ['error', {
      before: true,
      after: true
    }],
    '@stylistic/space-before-function-paren': ['error', {
      named: 'never',
      anonymous: 'always',
      asyncArrow: 'always'
    }],

    '@typescript-eslint/no-unused-vars': ['warn', {
      argsIgnorePattern: '^_',
      varsIgnorePattern: '^_',
      caughtErrorsIgnorePattern: '^_'
    }],

    'react-refresh/only-export-components': ['warn', {
      allowConstantExport: true
    }]
  },
  plugins: {
    '@stylistic': stylistic,
    'react-hooks': reactHooks,
    'react-refresh': reactRefresh
  },
  languageOptions: {
    globals: {
      ...globals.browser,
      ...globals.node
    }
  }
}]
