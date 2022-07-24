Element.prototype.dragEle = (function(goto) {
    // 鼠标点击和松开的时间如果在规定时间内，就是点击事件
    var beginTime = 0,
        endTime = 0,
        // 下面的都是固定值，写在外面减少性能消耗
        viewPortX = getViewPortSize().width, // 视口宽度
        viewPortY = getViewPortSize().height,
        eleW = parseInt(getEleValue(this, "width")), // 元素宽度
        eleH = parseInt(getEleValue(this, "height"))

    eleDrag.call(this) // 修改函数的this指向为绑定的元素节点
    _self = this // 保存外部this

    function eleDrag() {
        var x,
            y,
            sizeArr = [];


        addEvent(this, "mousedown", function(e) {
            var e = e || window.event
            beginTime = new Date().getTime()

            // 获取鼠标点击时，鼠标位置距离元素节点左上角的距离
            x = pageResemble(e).left - parseInt(getEleValue(_self, "left"))
            y = pageResemble(e).top - parseInt(getEleValue(_self, "top"))
                // 保存鼠标点击时的初始位置,防止之后想要点击时误拖曳了元素
            sizeArr.x = parseInt(getEleValue(_self, "left"))
            sizeArr.y = parseInt(getEleValue(_self, "top"))
            addEvent(document, "mousemove", mouseMove) // 鼠标移动事件
            addEvent(document, "mouseup", mouseUp) // 鼠标弹起
            cancelBubble(e) // 清除冒泡
            cancelpreventDefault(e) // 清除默认事件
        });

        function mouseMove(e) {
            var e = e || window.event,
                // https://ke.qq.com/webcourse/386920/104499667#taid=13292245176674152&vid=5285890787799483220 50分钟讲解边界问题
                // 防止元素超过视口边界
                leftBound = pageResemble(e).left - x, // 当前点击位置距离【页面】边界的距离 - 点击的位置距离【元素】边界的距离
                topBound = pageResemble(e).top - y

            if (leftBound <= 0) {
                leftBound = 0
            } else if (leftBound >= viewPortX - eleW) { // 移动的位置 >= 视口宽度-元素宽度
                leftBound = viewPortX - eleW
            }
            if (topBound <= 0) {
                topBound = 0
            } else if (topBound >= viewPortY - eleH) {
                topBound = viewPortY - eleH
            }

            // 给元素位置赋值
            _self.style.top = topBound + "px"
            _self.style.left = leftBound + "px"
        }

        function mouseUp(e) {
            var e = e || window.event
            endTime = new Date().getTime()

            // 点击的时间小于200，就跳转到其他页面
            if (endTime - beginTime < 200) {
                goto()
                _self.style.left = sizeArr.x + "px"
                _self.style.top = sizeArr.y + "px"
            }
            removeEvent(document, "mousemove", mouseMove)
            removeEvent(document, "mouseup", mouseUp)
        }
    }
    eleDrag(this) // 执行拖曳效果
})