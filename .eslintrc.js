module.exports = {
    root: true,
    env: {
        node: true
    },
    extends: [
        'plugin:vue/essential',
        '@vue/standard'
    ],
    parserOptions: {
        parser: '@babel/eslint-parser'
    },
    rules: {
        indent: 0,
        // 函数括号前没加空格报错的修复方法
        'space-before-function-paren': 'off',
        'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        // 取消保存不换行就报错的问题
        'eol-last': 0
            // 'quotes': [1 , "single"]
    }
    // 下面是禁用未按换行时报错的问题
    // eslint-disable-next-line eol-last
}