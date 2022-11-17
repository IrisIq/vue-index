module.exports = {
  // 表示ESLint规则，将被限制在根目录下
  root: true,
  env: {
    // 表示在node环境下，启用ESLint
    node: true
  },
  extends: ['plugin:vue/vue3-essential', '@vue/standard'],
  parserOptions: {
    parser: '@babel/eslint-parser'
  },
  // 我们主要使用以下规则配置
  // 错误急别分为三类
  // 1、off 或 0 表示关闭验证规则
  // 2、warn 或 1 表示开启警告验证规则
  // 3、error 或 2 表示开启错误验证规则，程序会报错退出
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'vue/multi-word-component-names': 0,
    'space-before-function-paren': 0,
    'new-cap': 0,
    camelcase: 0,
    json: 0,
    'no-unused-vars': 0
  }
}
