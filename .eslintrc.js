// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint'
  },
  env: {
    browser: true
  },
  extends: [
    // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
    // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
    'plugin:vue/recommended',
    // https://github.com/standard/standard/blob/master/docs/RULES-en.md
    'airbnb-base'
  ],
  // required to lint *.vue files
  plugins: ['vue'],
  // add your custom rules here
  rules: {
    // allow async-await
    'generator-star-spacing': 'off',
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    "linebreak-style": "off", // 取消换行符\n或\r\n的验证
    "semi": ["error", "never"], // 不使用分号
    "arrow-parens": ["error", "as-needed"], // 箭头函数的参数可以不使用圆括号
    "comma-dangle": ["error", "never"], // 不允许末尾逗号
    "consistent-return": "off", // 关闭函数中return的检测
    "object-curly-newline": ["error", { "consistent": true }], // 花括号内的换行符不一定要格式一致
    "global-require": "off", // 取消对require的验证，使得可以使用require来加载图片的相对路径
    "function-paren-newline": "off", // 不验证函数括号内的换行
    "import/no-unresolved": "off", // 取消自动解析路径，以此开启alias的别名路径设置
    "no-param-reassign": "off", // 允许对函数参数进行再赋值
    "import/extensions": "off", // 取消对文件扩展名的验证
    "max-len": "off", // 取消行的最大长度的验证，使SVG不用重新调整格式
    "no-underscore-dangle": "off", //允许标识符中有下划线，从而支持vue中插件的使用
    "no-console": "off", // 启用console控制台
    "no-unused-expressions": "off", // 允许使用未使用过的表达式，以此来支持a && a()的代码形式
    "no-shadow": "off", // 取消变量声明覆盖的验证
    'vue/attribute-hyphenation': 0, // 取消对元素特性只能使用中划线或小驼峰形式的验证
    'vue/max-attributes-per-line': 0 // 取消元素有多个特性时，每个特性独占一行的验证
  }
}
