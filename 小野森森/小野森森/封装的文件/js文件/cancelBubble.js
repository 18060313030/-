/**
 * 取消冒泡兼容性封装
 */

function cancelBubble(e) {
    var e = e || window.event
    if (e.stopPropagation) {
        e.stopPropagation()
    } else {
        e.cancelBubble = true
    }
}