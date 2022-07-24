/**
 * 封装元素拖曳效果(有边界限制)
 * 鼠标点击事件，点击元素的时间在规定时间内，可以跳转链接
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
    let oDiv = document.getElementsByClassName("box")[0]
    oDiv.dragEle(function() {
        window.open("https://www.baidu.com")
    })
</script>
*/