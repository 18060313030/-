/*
 * 事件的兼容性写法
 */
function addEvent(ele, type, fn) {
    if (ele.addeventListener) {
        ele.addeventListener(type, fn)
    } else if (ele.attachEvent) {
        ele.attachEvent("on" + type, function() {
            fn.call(ele)
        })
    } else {
        ele["on" + type] = fn
    }
}