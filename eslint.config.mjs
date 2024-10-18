import { fixupConfigRules } from '@eslint/compat'
import reactRefresh from 'eslint-plugin-react-refresh'
import stylisticEslintPlugin from '@stylistic/eslint-plugin'
import globals from 'globals'
import tsParser from '@typescript-eslint/parser'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import js from '@eslint/js'
import { FlatCompat } from '@eslint/eslintrc'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
})

export default [{
  ignores: ['**/dist', '**/.eslintrc.cjs'],
}, ...fixupConfigRules(compat.extends(
  'eslint:recommended',
  'plugin:@typescript-eslint/recommended',
)), {
  plugins: {
    'react-refresh': reactRefresh,
    '@stylistic': stylisticEslintPlugin,
  },

  languageOptions: {
    globals: {
      ...globals.browser,
    },

    parser: tsParser,
  },

  rules: {
    'react-refresh/only-export-components': ['warn', {
      allowConstantExport: true,
    }],

    '@stylistic/quotes': ['error', 'single', {
      avoidEscape: true,
    }],

    '@stylistic/semi': ['error', 'never'],

    '@stylistic/object-curly-spacing': ['error', 'always', {
      objectsInObjects: true,
    }],

    '@stylistic/key-spacing': ['error'],
    '@stylistic/comma-spacing': ['error'],
    '@stylistic/block-spacing': ['error'],
    '@stylistic/keyword-spacing': ['error'],
    '@stylistic/no-whitespace-before-property': ['error'],
    '@stylistic/yield-star-spacing': ['error', 'before'],
    '@stylistic/type-named-tuple-spacing': ['error'],
    '@stylistic/type-generic-spacing': ['error'],
    '@stylistic/type-annotation-spacing': ['error'],
    '@stylistic/template-curly-spacing': ['error'],
    '@stylistic/switch-colon-spacing': ['error'],
    '@stylistic/spaced-comment': ['error'],
    '@stylistic/space-unary-ops': ['error'],
    '@stylistic/space-infix-ops': ['error'],
    '@stylistic/space-in-parens': ['error'],

    '@stylistic/space-before-function-paren': ['error', {
      anonymous: 'never',
      named: 'never',
      asyncArrow: 'always',
    }],

    '@stylistic/space-before-blocks': ['error'],
    '@stylistic/arrow-spacing': ['error'],
    '@stylistic/rest-spread-spacing': ['error'],

    '@stylistic/no-trailing-spaces': ['error', {
      skipBlankLines: true,
      ignoreComments: true,
    }],

    '@stylistic/no-multi-spaces': ['error'],
    '@stylistic/no-mixed-spaces-and-tabs': ['error'],

    '@stylistic/jsx-curly-spacing': ['error', {
      when: 'never',
      children: true,
    }],

    '@stylistic/jsx-equals-spacing': ['error'],

    '@stylistic/jsx-tag-spacing': ['error', {
      closingSlash: 'never',
      beforeSelfClosing: 'always',
      afterOpening: 'never',
      beforeClosing: 'never',
    }],

    '@stylistic/function-call-spacing': ['error'],
    '@stylistic/generator-star-spacing': ['error', 'before'],
    '@stylistic/array-bracket-spacing': ['error'],
    '@stylistic/jsx-indent-props': ['error', 2],
    '@stylistic/jsx-indent': ['error', 2],
    '@stylistic/indent': ['error', 2],
    '@stylistic/indent-binary-ops': ['error', 2],

    '@stylistic/jsx-closing-bracket-location': ['error', {
      location: 'after-props',
    }],

    '@stylistic/jsx-closing-tag-location': ['error'],
    '@stylistic/jsx-curly-brace-presence': ['error', 'never'],
    '@stylistic/jsx-curly-newline': ['error'],
    '@stylistic/jsx-first-prop-new-line': ['error'],

    '@stylistic/jsx-max-props-per-line': ['error', {
      maximum: 1,
      when: 'multiline',
    }],

    '@stylistic/jsx-newline': ['error', {
      prevent: true,
      allowMultilines: true,
    }],

    '@stylistic/jsx-one-expression-per-line': ['error', {
      allow: 'literal',
    }],

    '@stylistic/jsx-quotes': ['error', 'prefer-double'],
    '@stylistic/jsx-self-closing-comp': ['error'],

    '@stylistic/jsx-wrap-multilines': ['error', {
      declaration: 'parens-new-line',
      assignment: 'parens-new-line',
      return: 'parens-new-line',
      arrow: 'parens-new-line',
      condition: 'parens-new-line',
      logical: 'parens-new-line',
      prop: 'parens-new-line',
    }],

    '@stylistic/comma-dangle': ['error', 'always-multiline'],
    '@stylistic/comma-style': ['error'],
    '@stylistic/no-extra-semi': ['error'],

    '@stylistic/semi-spacing': ['error', {
      before: false,
      after: true,
    }],

    '@stylistic/semi-style': ['error', 'last'],
    '@stylistic/dot-location': ['error', 'property'],
    '@stylistic/multiline-ternary': ['error', 'always-multiline'],
    '@stylistic/no-mixed-operators': ['error'],
    '@stylistic/operator-linebreak': ['error', 'after'],

    '@stylistic/no-extra-parens': ['error', 'all', {
      ignoreJSX: 'multi-line',
    }],

    '@stylistic/no-floating-decimal': ['error'],

    '@stylistic/no-multiple-empty-lines': ['error', {
      max: 1,
      maxBOF: 0,
      maxEOF: 0,
    }],

    '@stylistic/max-len': ['error', {
      code: 120,
    }],

    '@stylistic/max-statements-per-line': ['error'],

    '@stylistic/object-curly-newline': ['error', {
      consistent: true,
    }],

    '@stylistic/member-delimiter-style': ['error', {
      multiline: {
        delimiter: 'none',
        requireLast: false,
      },

      singleline: {
        delimiter: 'comma',
        requireLast: false,
      },
    }],

    '@stylistic/nonblock-statement-body-position': ['error'],
    '@stylistic/one-var-declaration-per-line': ['error', 'always'],
    '@stylistic/padded-blocks': ['error', 'never'],
    '@stylistic/brace-style': ['error'],
  },
}]
