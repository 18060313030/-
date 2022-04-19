window.addEventListener("load", function() {
    // 1、获取元素
    let arrow_l = this.document.querySelector(".arrow-l")
    let arrow_r = this.document.querySelector(".arrow-r")
    let focus = this.document.querySelector(".focus")

    // 2、鼠标经过图片显示左右箭头，离开则隐藏
    focus.addEventListener("mouseenter", function() {
        arrow_l.style.display = "block"
        arrow_r.style.display = "block"
        clearInterval(timer) // 鼠标悬停的时候清除定时器
        timer = null
    })
    focus.addEventListener("mouseleave", function() {
        arrow_l.style.display = "none"
        arrow_r.style.display = "none"

        // 鼠标离开开启定时器
        timer = setInterval(function() {
            arrow_r.click() // 手动调用点击事件
        }, 2000)
    })


    let ul = focus.querySelector("ul") // 获取存放图片的li元素的父元素ul
    let ol = focus.querySelector("ol") // 获取存放小圆点的li元素的父元素ol
    let width = focus.offsetWidth // 获取图片的大小(图片大小等于容器大小)  用来计算图片滚动距离

    // 3、根据图片的数量创建底下小圆点的数量
    for (let i = 0; i < ul.children.length; i++) {
        let li = this.document.createElement("li") // 创建li
        ol.appendChild(li) // 添加到ol中
        li.setAttribute("index", i) // 自定义属性index，用来标记圆点的索引
            // 3.1 创建li的同时为其绑定一个点击事件，点击当前小圆点会添加样式，其他圆点清除样式
        li.addEventListener("click", function() {
            // 清除所有小圆点的样式
            for (let i = 0; i < ol.children.length; i++) {
                ol.children[i].className = ""
            }
            li.className = "current" // 为当前点击的小圆点绑定样式

            // 3.2 点击小圆点图片会进行切换，根据圆点的自定义属性index(0,1,2...) 乘上 图片的大小就是切换的距离 因为往左边走所以是负数
            let index = this.getAttribute("index") // 获取圆点的自定义属性index

            // 将获取到的小圆点的索引赋值给num(点击右箭头，控制图片切换距离)和circle(圆点同步点击箭头后的索引)
            num = index
            circle = index
            animate(ul, -index * width)
        })
    }
    // 给第一个小圆点添加样式
    ol.children[0].className = "current"

    // 4、克隆第一张图片
    let first = ul.children[0].cloneNode(true)
    ul.appendChild(first)

    let circle = 0 // 小圆点同步切换样式的变量

    // 5、点击右箭头
    let num = 0 // 控制图片的切换距离
    let flag = true // 节流阀 防止连续点击箭头时，图片滚动过快
    arrow_r.addEventListener("click", function() {
        if (flag) {
            flag = false
                // 当图片移动到最后一张时(该图片为复制的第一张图片),立即切换到第一张
            if (num == ul.children.length - 1) {
                ul.style.left = 0
                num = 0
            }
            num++

            // 移动图片
            animate(ul, -num * width, function() {
                flag = true
            })

            // 6、根据图片的切换同步改变圆点的样式
            circle++
            if (circle == ol.children.length) { // 当circle等于圆点数量最大值时，就改为0,变到第一个圆点去
                circle = 0
            }
            for (let i = 0; i < ol.children.length; i++) { // 将所有圆点样式清空
                ol.children[i].className = ""
            }
            ol.children[circle].className = "current" // 给当前圆点添加样式
        }
    })

    // 7、点击左箭头
    arrow_l.addEventListener("click", function() {
        if (flag) {
            flag = false

            // 当图片移动到第一张时,立即切换到最后一张
            if (num == 0) {
                num = ul.children.length - 1
                ul.style.left = -num * width + "px"

            }
            num--

            // 移动图片
            animate(ul, -num * width, function() {
                flag = true
            })

            // 8、根据图片的切换同步改变圆点的样式
            circle--
            if (circle < 0) { // 当circle等于圆点数量最小值时，就改为最大值,变到最后一个圆点去
                circle = ol.children.length - 1
            }
            for (let i = 0; i < ol.children.length; i++) { // 将所有圆点样式清空
                ol.children[i].className = ""
            }
            ol.children[circle].className = "current" // 给当前圆点添加样式
        }
    })

    // 9、自动播放
    let timer = this.setInterval(function() {
        arrow_r.click() // 手动调用点击事件
    }, 2000)
})