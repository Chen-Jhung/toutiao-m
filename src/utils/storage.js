// 封装本地存储操作模块
/*
存储模块
*/
export const setItem = (key, value) => {
        // js提供了typeof运算符 用来检测一个变量的类型
        if (typeof value === 'object') {
            value = JSON.stringify(value) // 将token值转化成JSON字符串
        }
        window.localStorage.setItem(key, value) // setItem是保存数据的意思
    }
    /*
    读取数据
    */
export const getItem = key => {
        const data = window.localStorage.getItem(key)
        try {
            // 读取返回数值的时候需要把token值转化成js对象格式
            // 如果data的数值为JSON字符串的话，直接把token值转化后返回js对象格式
            return JSON.parse(data)
        } catch (err) {
            // 如果不是JSON格式则直接返回data数据
            return data
        }
    }
    /*
    删除数据
    */
export const removeItem = key => {
    window.localStorage.removeItem(key)
}