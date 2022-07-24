/**
 * 封装元素拖曳效果(有边界限制)
 * 鼠标双击事件，点击元素的时间在规定时间内，可以跳转链接
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

var dragEle = (function(ele, menu, goto) {
    // 鼠标点击和松开的时间间隔如果在规定时间内，就是点击事件
    var beginTime = 0,
        endTime = 0,
        oneClickTime = 0, // 双击中第一次点击的时间戳
        twoClickTime = 0, // 双击中第二次点击的时间戳
        counter = 0, // 双击的累计次数
        timer = null, // 定时器
        menuW = parseInt(getEleValue(menu, "width")), // 菜单栏固定宽度
        menuH = parseInt(getEleValue(menu, "height")), // 菜单栏固定长度
        viewPortX = getViewPortSize().width, // 视口宽度
        viewPortY = getViewPortSize().height, // 视口高度
        eleW = parseInt(getEleValue(ele, "width")), // 目标元素宽度
        eleH = parseInt(getEleValue(ele, "height")) // 目标元素高度

    eleDrag(ele) // 执行拖曳效果

    function eleDrag(ele) {
        var x,
            y,
            sizeArr = []

        // 鼠标按下
        addEvent(ele, "mousedown", function(e) {
            var e = e || window.event,
                mouseMark = e.button,
                clickX = pageResemble(e).left,
                clickY = pageResemble(e).top

            // 点击鼠标右键
            if (mouseMark === 2) {
                // 以下代码是修改菜单栏位于右上顶点、右下顶点、左下顶点，最下方 时所处的位置
                // https://ke.qq.com/webcourse/386920/104499667#taid=13292245176674152&vid=5285890787799483220 1小时23分钟
                if (clickX <= 0) {
                    clickX = 0
                } else if (clickX >= viewPortX - menuW) {
                    clickX = pageResemble(e).left - menuW
                }

                if (clickY <= 0) {
                    clickY = 0
                } else if (clickY >= viewPortY - menuH) {
                    clickY = pageResemble(e).top - menuH
                }
                menu.style.left = clickX + "px"
                menu.style.top = clickY + "px"
                menu.style.display = "block"
            } else if (mouseMark === 0) { // 点击鼠标左键
                beginTime = new Date().getTime()

                menu.style.display = "none" // 移动元素时隐藏出现的菜单栏

                // 获取鼠标点击时，鼠标位置距离元素节点左上角的距离
                x = pageResemble(e).left - parseInt(getEleValue(this, "left"))
                y = pageResemble(e).top - parseInt(getEleValue(this, "top"))

                // 保存鼠标点击时的初始位置,防止之后想要点击时误拖曳了元素
                sizeArr.x = parseInt(getEleValue(this, "left"))
                sizeArr.y = parseInt(getEleValue(this, "top"))

                addEvent(document, "mousemove", mouseMove) // 鼠标移动事件
                addEvent(document, "mouseup", mouseUp) // 鼠标弹起
                cancelBubble(e) // 取消冒泡
                cancelpreventDefault(e) // 阻止默认事件行为
            }
        })

        // 阻止鼠标右键整个document文档时出现菜单栏的行为
        addEvent(document, "contextmenu", function(e) {
            cancelpreventDefault(e)
        })

        // 点击页面时候，隐藏右键的菜单栏
        addEvent(document, "click", function() {
            menu.style.display = "none"
        })

        // 点击菜单栏的时候，保持菜单栏显示 
        addEvent(menu, "click", function(e) {
            e = e || window.event
            cancelBubble(e) // 取消冒泡，否则会触发父级元素的点击事件，导致菜单栏被隐藏
            menu.style.display = "block"
        })

        // 移动鼠标
        function mouseMove(e) {
            var e = e || window.event

            // 防止元素超过视口边界
            let leftBound = pageResemble(e).left - x,
                topBound = pageResemble(e).top - y

            if (leftBound <= 0) {
                leftBound = 0
            } else if (leftBound >= viewPortX - eleW) {
                leftBound = viewPortX - eleW
            }
            if (topBound <= 0) {
                topBound = 0
            } else if (topBound >= viewPortY - eleH) {
                topBound = viewPortY - eleH
            }

            // 给元素位置赋值
            ele.style.top = topBound + "px"
            ele.style.left = leftBound + "px"
        }

        // 鼠标弹起
        function mouseUp(e) {
            var e = e || window.event
            endTime = new Date().getTime()

            // 双击元素跳转页面
            if (endTime - beginTime < 200) {
                // 元素归位，防止元素被误拖动
                ele.style.left = sizeArr.x + "px"
                ele.style.top = sizeArr.y + "px"
                counter++
                if (counter === 1) {
                    oneClickTime = new Date().getTime()
                } else if (counter === 2) {
                    twoClickTime = new Date().getTime()
                }
                // 第一次、第二次点击时间存在，并且两次点击时间间隔小于200，就跳转页面
                if (oneClickTime && twoClickTime && (twoClickTime - oneClickTime) < 200) {
                    goto()
                }
                // 如果第一次点击之后过了0.5秒还没有点击第二次，就清除记录
                timer = setTimeout(function() {
                    oneClickTime = 0
                    twoClickTime = 0
                    counter = 0
                    clearTimeout(timer)
                }, 500)

            }
            removeEvent(document, "mousemove", mouseMove)
            removeEvent(document, "mouseup", mouseUp)
        }
    }
})