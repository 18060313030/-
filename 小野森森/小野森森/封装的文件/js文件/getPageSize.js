/*
 * 返回内容的宽高
 * 使用场景：小说自动阅读器 判断到底部了，停止滑动. 
 * 总长度(getScrollSize()) <= 滚出屏幕的长度(getScrollOffset()) + 视口的长度(getViewPortSize()) + 2(偏差)   
 */
function getScrollSize() {
    if (document.body.scrollWidth) {
        return {
            width: document.body.scrollWidth,
            height: document.body.scrollHeight
        }
    } else {
        return {
            width: document.documentElement.scrollWidth,
            height: document.documentElement.scrollHeight
        }
    }
}