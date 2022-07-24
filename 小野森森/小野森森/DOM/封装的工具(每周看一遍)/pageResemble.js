    /*
     * pageX/Y可以计算出包【含滚动距离】的鼠标点击坐标,但是有兼容性问题
     * 功能：封装一个同 pageX/Y 效果的函数
     * 原理：滚动出视口的距离 + 当前视口的距离 - 偏移的距离
     * bug：当滚动条拉动到【底部】，window.pageYOffset获取的值会有0.5-0.8的差距,拉动到【顶部】，就又恢复了
     * getScrollOffset(): 封装的函数，用于求出滚出屏幕的距离
     */
    function pageResemble(e) {
        let scrollY = getScrollOffset().top, // 滚动出屏幕的距离
            scrollX = getScrollOffset().left,
            offsetX = document.documentElement.clientLeft || 0, // 文档偏移值,IE8之外的浏览器可能该值为undefined
            offsetY = document.documentElement.clientTop || 0

        return {
            left: e.clientX + scrollX - offsetX,
            top: e.clientY + scrollY - offsetY
        }
    }