/**
 * 移出事件绑定监听的封装函数
 */

function removeEvent(ele, eventName, fn) {
    if (ele.addEventListener) {
        ele.removeEventListener(eventName, fn)
    } else if (ele.attachEvent) {
        ele.detachEvent("on" + eventName, fn)
    } else {
        ele["on" + eventName] = null
    }
}