// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import storybook from "eslint-plugin-storybook";

import js from '@eslint/js'
import tseslint from 'typescript-eslint'
import reactHooks from 'eslint-plugin-react-hooks'

export default tseslint.config(js.configs.recommended, ...tseslint.configs.recommended, {
  plugins: {
    'react-hooks': reactHooks,
  },
  rules: {
    ...reactHooks.configs.recommended.rules,
  },
}, {
  ignores: ['dist/**', 'node_modules/**', 'storybook-static/**'],
}, storybook.configs["flat/recommended"]);
