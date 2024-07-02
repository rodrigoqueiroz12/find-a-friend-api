import pluginJs from '@eslint/js'
import stylisticTs from '@stylistic/eslint-plugin-ts'
import parserTs from '@typescript-eslint/parser'
import simpleImportSort from 'eslint-plugin-simple-import-sort'
import globals from 'globals'
import tseslint from 'typescript-eslint'

export default [
  { languageOptions: { globals: globals.node } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  {
    ignores: ['node_modules']
  },
  {
    plugins: {
      '@stylistic/ts': stylisticTs
    },
    languageOptions: {
      parser: parserTs
    },
    rules: {
      '@stylistic/ts/indent': ['error', 2],
      '@stylistic/ts/block-spacing': 'error',
      '@stylistic/ts/brace-style': 'error',
      '@stylistic/ts/comma-dangle': 'error',
      '@stylistic/ts/comma-spacing': 'error',
      '@stylistic/ts/semi': ['error', 'never'],
      '@stylistic/ts/quote-props': ['error', 'consistent-as-needed'],
      '@stylistic/ts/quotes': ['error', 'single', {
        avoidEscape: true
      }]
    }
  },
  {
    plugins: {
      'simple-import-sort': simpleImportSort
    },
    rules: {
      'simple-import-sort/imports': 'error'
    }
  },
  {
    rules: {
      'prefer-const': 'error',
      'no-unused-vars': 'error',
      'no-func-assign': 'error',
      'no-const-assign': 'error',
      'no-unreachable': 'warn',
      'no-empty-pattern': 'error',
      'no-duplicate-imports': 'error',
      'no-duplicate-case': 'error',
      'array-callback-return': 'error',
      'getter-return': 'error',
      'no-dupe-keys': 'error',
      'arrow-body-style': ['error', 'always'],
      'camelcase': 'error',
      'eqeqeq': 'error',
      'no-empty': 'error',
      'no-empty-function': 'error'
    }
  }
]
