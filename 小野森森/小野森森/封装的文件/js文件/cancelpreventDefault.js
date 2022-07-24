/**
 * 取消默认事件兼容性函数封装
 */

function cancelpreventDefault(e) {
    var e = e || window.event
    if (e.preventDefault) {
        e.preventDefault()
    } else {
        e.returnValue = false
    }
}