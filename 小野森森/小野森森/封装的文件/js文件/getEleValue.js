/*
 * 获取值的方法，获取的值比较准
 */

function getEleValue(ele, prop) {
    // 判断该属性方法是否存在
    if (window.getComputedStyle) {
        if (prop) { // 是否有传入指定的属性
            return window.getComputedStyle(ele, null)[prop]
        } else { // 没有传入指定的属性，返回整个集合
            return window.getComputedStyle(ele, null)
        }
    } else { // 使用ie8及以下兼容的方法
        if (prop) {
            return ele.currentStyle[prop]
        } else {
            return ele.currentStyle
        }
    }
}