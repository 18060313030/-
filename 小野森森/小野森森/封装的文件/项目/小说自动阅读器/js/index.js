let arrowUp = document.getElementsByClassName("arrowUp")[0],
    header = document.getElementsByClassName("bk_hd")[0];

// addEvent(对象,事件名,回调函数)是封装好的绑定事件函数
addEvent(window, "scroll", function() {
    let top = getScrollOffset().top
    arrowUp.style.display = top ? "block" : "none"
})

addEvent(arrowUp, "click", function() {
    window.scroll(0, 0)
})

addEvent(header, "click", function() {
    window.scroll(0, 0)
})