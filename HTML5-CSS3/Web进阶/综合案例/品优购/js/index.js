$(function() {

    // 节流阀
    let flag = true

    // 页面移动到指定位置会显示楼层导航
    let showSite = $(".intresting").offset().top
    showElevator()

    // 显示和隐藏电梯导航
    function showElevator() {
        if ($(document).scrollTop() > showSite) {
            $(".elevator").fadeIn()
        } else {
            $(".elevator").fadeOut()
        }
    }
    // 回到顶部导航条,固定定位时的头部距离
    let fixTop = $(".backup").offset().top - $(".nav").offset().top

    // 页面滚动事件
    $(window).scroll(function() {
        showElevator()
        if (flag) {
            // 如果页面滚动的距离大于等于,当前楼层区域距离文档顶部的距离,就将对应的电梯导航加上样式
            $(".floor .w").each(function(index, item) {
                if ($(document).scrollTop() >= $(item).offset().top) {
                    $(".elevator li").eq(index).addClass("elevator_active").siblings("li").removeClass("elevator_active")
                }
            })
        }


        // 回到顶部导航条位置设置

        if ($(document).scrollTop() > fixTop) {
            $(".backup").css({
                "position": "fixed",
                "top": fixTop
            })
        } else {
            $(".backup").css({
                "position": "absolute",
                "top": "300px"
            })
        }

        // 回到顶部
        if ($(document).scrollTop() > showSite) {
            $(".backup li:last").fadeIn()
            $(".backup li:last").on("click", function() {
                $("body,html").stop().animate({
                    scrollTop: 0
                })
            })
        } else {
            $(".backup li:last").fadeOut()
        }

    })

    // 点击电梯导航按钮,切换对应的楼层区域
    $(".elevator li").on("click", function() {
        flag = false
        let index = $(this).index()
        let floorSite = $(".floor .w").eq(index).offset().top
        $("body,html").stop().animate({
            scrollTop: floorSite
        }, function() {
            flag = true
        })
        $(this).addClass("elevator_active").siblings().removeClass("elevator_active")
    })





    // //  图片懒加载
    // lazyLoadInit()
    // lazyLoadInit({
    //     coverColor: "white",
    //     coverDiv: "",
    //     offsetBottom: 0,
    //     offsetTopm: 0,
    //     showTime: 1100,
    //     onLoadBackEnd: function(i, e) {
    //         console.log("onLoadBackEnd:" + i);
    //     },
    //     onLoadBackStart: function(i, e) {
    //         console.log("onLoadBackStart:" + i);
    //     }
    // });





    // 轮播图
    let arrow_l = document.querySelector(".arrow_l")
    let arrow_r = document.querySelector(".arrow_r")
    let loop = document.querySelector(".loop")

    // 1、鼠标进入轮播图区域，显示和隐藏左右箭头
    loop.addEventListener("mouseenter", function() {
        arrow_l.style.display = "block"
        arrow_r.style.display = "block"
        clearInterval(loopTimer)
        loopTimer = null
    })
    loop.addEventListener("mouseleave", function() {
        arrow_l.style.display = "none"
        arrow_r.style.display = "none"

        // 鼠标离开开启定时器
        loopTimer = setInterval(function() {
            arrow_r.click() // 手动调用点击事件
        }, 2000)
    })

    width = loop.offsetWidth // 轮播图区域的宽度

    //  2、轮播图小圆点的数量随着轮播图图片数量而定
    let ul = document.querySelector(".loop ul")
    let ol = document.querySelector(".loop ol")
    for (let i = 0; i < ul.children.length; i++) {
        let li = document.createElement("li")
        li.setAttribute("index", i)
        ol.appendChild(li)

        // 给当前点击的小圆点添加样式，其余的去除样式
        li.addEventListener("click", function() {
            for (let j = 0; j < ol.children.length; j++) {
                ol.children[j].className = ""
            }
            this.className = "circle"
            let index = this.getAttribute("index")
            num = index
            circle = index
            animate(ul, -width * index)
        })
    }
    // 给第一个小圆点添加样式
    ol.children[0].className = "circle"

    // 克隆第一张图片
    let lastImg = ul.children[0].cloneNode(true)
    ul.appendChild(lastImg)

    let num = 0
    let circle = 0 // 点击箭头时，小圆点样式跟着变化
    let loopFlag = true

    // 点击右箭头
    arrow_r.addEventListener("click", function() {
        if (loopFlag) {
            loopFlag = false
            if (num === ul.children.length - 1) {
                ul.style.left = 0
                num = 0
            }
            num++
            animate(ul, -num * width, function() {
                loopFlag = true
            })
            circle++
            if (circle === 4) {
                circle = 0
            }
            // 清除所有小圆点样式，添加当前小圆点的样式
            for (let i = 0; i < ol.children.length; i++) {
                ol.children[i].className = ''
            }
            ol.children[circle].className = "circle"
        }
    })

    // 点击左箭头
    arrow_l.addEventListener("click", function() {
        if (flag) {
            flag = false
            if (num == 0) {
                num = ul.children.length - 1
                ul.style.left = -ul.children.length - 1 * width
            }
            num--
            animate(ul, -num * width, function() {
                loopFlag = true
            })
            circle--
            if (circle < 0) {
                circle = ol.children.length - 1
            }
            // 清除所有小圆点样式，添加当前小圆点的样式
            for (let i = 0; i < ol.children.length; i++) {
                ol.children[i].className = ''
            }
            ol.children[circle].className = "circle"
        }

    })

    // 自动播放
    let loopTimer = setInterval(function() {
        arrow_r.click()
    }, 2000)
})