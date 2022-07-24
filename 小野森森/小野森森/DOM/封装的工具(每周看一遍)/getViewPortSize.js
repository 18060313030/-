/*
 * 获取视口的宽高   兼容性处理
 */
function getViewPortSize() {
    if (window.innerWidth) {
        return {
            width: window.innerWidth,
            height: window.innerHeight
        }
    } else {
        // 兼容性处理，如果模式为怪异模式，就使用怪异模式兼容的方法，否则使用标准模式兼容的方法
        if (document.compatMode === "BackCompat") {
            return {
                width: document.body.innerWidth,
                height: document.body.innerHeight
            }
        } else {
            return {
                width: document.documentElement.innerWidth,
                height: document.documentElement.innerHeight
            }
        }
    }
}