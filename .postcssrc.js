// 基本的 PostCSS 示例配置，可以在此配置的基础上根据项目需求进行修改
/**
 * PostCSS 配置文件
 */

module.exports = {
    plugins: {
        'postcss-pxtorem': {
            // rootValue: 75,
            // 使用PostCSS函数方法 解构获取到的参数然后获取到file之后进行判断
            rootValue({ file }) {
                // console.log(file);
                // 在获取到的参数中 用indexOf查找字符串中是否有包含vant，有的话返回37.5 反之则返回75
                return file.indexOf('vant') !== -1 ? 37.5 : 75
            },
            propList: ['*'],
            // 配置不要转换的样式资源
            exclude: 'github-markdown.css'
        }
    }
}