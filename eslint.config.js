// eslint.config.js
import js from '@eslint/js';
import react from 'eslint-plugin-react';
import reactNative from 'eslint-plugin-react-native';
import globals from 'globals';

export default [
  js.configs.recommended,
  {
    files: ['**/*.{js,jsx}'],
    ignores: ['node_modules/**'],
    plugins: {
      react,
      'react-native': reactNative,
    },
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.es2021,
        ...globals.node,
        __DEV__: 'readonly',
        fetch: 'readonly',
      },
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: { jsx: true },
      },
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    rules: {
      ...react.configs.recommended.rules,
      ...reactNative.configs.all.rules,
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
      'react-native/no-color-literals': 'off',
    },
  },
];
