/**
 * 封装元素拖曳效果(有边界限制)
 * 
 * addEvent() // 封装好的函数，绑定事件监听函数
 * pageResemble() // 封装好的函数，功能类似于 e.pageX/Y
 * removeEvent() // 封装好的函数，移除事件监听
 * getEleValue() // 封装好的函数，获取节点的所有属性 底层是getComputedStyle()
 * 
 * 我们使用鼠标拖曳目标时，鼠标需要处于在我们点击的位置，所以需要鼠标当前的位置坐标距离 减去 元素左上角距离视口边界的距离，不懂看下方视频链接
 * https://ke.qq.com/webcourse/386920/104499667#taid=13292245176674152&vid=5285890787799483220   8分钟
 */

function eleDrag(ele) {
    var x,
        y
    addEvent(ele, "mousedown", function(e) {
        // 获取鼠标点击时，鼠标位置距离元素节点左上角的距离
        x = pageResemble(e).left - parseInt(getEleValue(this, "left"))
        y = pageResemble(e).top - parseInt(getEleValue(this, "top"))

        addEvent(document, "mousemove", mouseMove) // 鼠标移动事件
        addEvent(document, "mouseup", mouseUp) // 鼠标弹起
        cancelBubble(e)
        cancelpreventDefault(e)
    })

    function mouseMove(e) {
        var e = e || window.event

        // 防止元素超过视口边界
        var leftBound = e.clientX - x,
            topBound = e.clientY - y
        if (leftBound <= 0) {
            leftBound = 0
        } else {
            leftBound = ele.style.left = pageResemble(e).left - x + "px"
        }

        if (topBound <= 0) {
            topBound = 0
        } else {
            topBound = ele.style.top = pageResemble(e).top - y + "px"
        }

        // 给元素位置赋值
        oDiv.style.top = topBound
        oDiv.style.left = leftBound
    }

    function mouseUp() {
        removeEvent(document, "mousemove", mouseMove)
        removeEvent(document, "mouseup", mouseUp)
    }
}