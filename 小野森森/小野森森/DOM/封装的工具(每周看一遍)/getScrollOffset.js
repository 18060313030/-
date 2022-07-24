/*
 * 处理获取页面滚动距离   兼容性处理
 */

function getScrollOffset() {
    if (window.pageXOffset) {
        return {
            left: window.pageXOffset,
            top: window.pageYOffset
        }
    } else {
        return {
            // 在IE678版本中，怪异模式不支持document.documentElement.scrollLeft，标准模式不支持document.body.scrollLeft
            left: document.body.scrollLeft + document.documentElement.scrollLeft,
            top: document.body.scrollTop + document.documentElement.scrollTop
        }
    }
}