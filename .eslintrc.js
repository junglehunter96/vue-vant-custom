module.exports = {
  root: true,

  globals: {
    process: true,
  },

  parserOptions: {
    parser: 'babel-eslint',
    sourceType: 'module',
    ecmaFeatures: {
      legacyDecorators: true,
    },
  },

  env: {
    browser: true,
    node: true,
    es6: true,
  },

  // extends: ['plugin:vue/recommended', 'eslint:recommended'],
  plugins: ["babel", "prettier"],

  // 单元测试相关
  overrides: [
    {
      files: [
        "**/__tests__/*.{j,t}s?(x)",
        "**/tests/unit/**/*.spec.{j,t}s?(x)",
      ],
      env: {
        jest: true,
      },
    },
  ],

  'extends': [
    'plugin:vue/essential',
    'eslint:recommended'
  ],

  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off'
  }
};
