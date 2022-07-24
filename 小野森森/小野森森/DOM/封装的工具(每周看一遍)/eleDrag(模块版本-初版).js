/**
 * 封装元素拖曳效果(有边界限制)
 * 鼠标点击事件，点击元素的时间在规定时间内，可以跳转链接
 * 有鼠标右键弹出菜单栏功能(对功能的极限位置进行菜单栏位置的调整)
 * 
 * 当作模块在html页面中通过script被引用
 * 
 * addEvent() // 封装好的函数，绑定事件监听函数
 * pageResemble() // 封装好的函数，功能类似于 e.pageX/Y
 * removeEvent() // 封装好的函数，移除事件监听
 * getEleValue() // 封装好的函数，获取节点的所有属性 底层是getComputedStyle()
 * 
 * 我们使用鼠标拖曳目标时，鼠标需要处于在我们点击的位置，所以需要鼠标当前的位置坐标距离 减去 元素左上角距离视口边界的距离，不懂看下方视频链接
 * https://ke.qq.com/webcourse/386920/104499667#taid=13292245176674152&vid=5285890787799483220   8分钟
 */

// 调用方式
/*
<script src="./代码所在模块.js"></script>
<script>
    let oDiv = document.getElementsByClassName("box")[0],
        oMenu = document.getElementByClassName("menu")[0]
    dragEle(oDiv, oMenu, function() {
        window.open("https://www.baidu.com")
    })
</script>
*/

var dragEle = (function(ele, goto) {
    // 鼠标点击和松开的时间如果在规定时间内，就是点击事件
    var beginTime = 0,
        endTime = 0

    eleDrag(ele) // 执行拖曳效果

    function eleDrag(ele) {
        var x,
            y,
            sizeArr = []
        addEvent(ele, "mousedown", function(e) {
            beginTime = new Date().getTime()

            // 获取鼠标点击时，鼠标位置距离元素节点左上角的距离
            x = pageResemble(e).left - parseInt(getEleValue(this, "left"))
            y = pageResemble(e).top - parseInt(getEleValue(this, "top"))

            // 保存鼠标点击时的初始位置,防止之后想要点击时误拖曳了元素
            sizeArr.x = parseInt(getEleValue(this, "left"))
            sizeArr.y = parseInt(getEleValue(this, "top"))

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

        function mouseUp(e) {
            var e = e || window.event
            endTime = new Date().getTime()

            // 点击的时间小于200，就跳转到其他页面
            if (endTime - beginTime < 200) {
                goto()
                ele.style.left = sizeArr.x + "px"
                ele.style.top = sizeArr.y + "px"
            }
            removeEvent(document, "mousemove", mouseMove)
            removeEvent(document, "mouseup", mouseUp)
        }
    }
})