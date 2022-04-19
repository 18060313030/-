window.addEventListener("load", function() {
    // 获取元素
    let focus = document.querySelector(".focus")
    let ul = focus.children[0]
    let ol = focus.children[1]
    let width = focus.offsetWidth // 获取滚动图片宽度(等于focus的宽度)

    // 1、自动轮播
    let index = 0 // 图片索引
    let flag = true
    let timer = setInterval(function() {
        index++
        console.log("自动轮播" + index);
        let translateX = -index * width // 滚动的距离 元素的索引 * 单次滚动的图片长度
        ul.style.transition = "all .3s" // 添加过渡，使滚动更平滑
        ul.style.transform = "translateX(" + translateX + "px)" // 向左滚动，为负数
    }, 2000)

    // 2、判断图片过渡效果已经过去了。关闭过渡，才能进行快速切换 使用事件transitionend
    ul.addEventListener("transitionend", function() {
            if (index >= 3) { //如果写index==3 那么在切换到其他页面时间过长时会有bug
                index = 0
                console.log("图片播放到最后一章" + index);
                ul.style.transition = "none" // 取消过渡效果。快速跳转到目标位置
                let translateX = -index * width // 滚动的距离 元素的索引 * 单次滚动的图片长度
                ul.style.transform = "translateX(" + translateX + "px)" // 向左滚动，为负数
            }

            // 3、小圆点跟随变化
            // 需要在过渡完成之后切换小圆点，所以要写在这里面
            // 移除小圆点的效果
            ol.querySelector(".current").classList.remove("current")

            // 给当前的小圆点添加效果
            ol.children[index].classList.add("current")

            // 4、手指滑动轮播图
            let initX = 0 // 手指的初始点击位置
            let moveX = 0 // 手指移动的距离
            ul.addEventListener("touchstart", function(e) {
                initX = e.targetTouches[0].pageX
                clearInterval(timer) // 移除轮播图自动播放
            })
            ul.addEventListener("touchmove", function(e) {
                moveX = e.targetTouches[0].pageX - initX // 手指移动的距离
                let translateX = -index * width + moveX // 盒子移动距离 = 盒子原来的位置+手指移动的距离
                ul.style.transition = "none" // 移除过渡效果
                ul.style.transform = "translateX(" + translateX + "px)"
                flag = true
                e.preventDefault(); // 阻止滚动屏幕的行为
            })

            // 5、当手指滑动到50px时会自动切换到下一张
            ul.addEventListener("touchend", function() {
                if (flag) {
                    if (Math.abs(moveX) > 50) {
                        console.log("手指移动距离" + moveX);
                        if (moveX > 0) {
                            // 向左切换图片
                            index--
                            console.log("向左切换图片" + index);
                        } else {
                            // 向右切换图片
                            index++
                            console.log("向右切换图片" + index);
                        }
                        let translateX = -index * width
                        ul.style.transition = "all .3s" // 添加过渡效果
                        ul.style.transform = "translateX(" + translateX + "px)"
                    } else {
                        // (2) 如果移动距离小于50像素我们就回弹
                        let translateX = -index * width
                        ul.style.transition = "all .3s" // 添加过渡效果
                        ul.style.transform = "translateX(" + translateX + "px)"
                    }
                }
                // 手指离开的时候就重新开启定时器
                clearInterval(timer);
                timer = setInterval(function() {
                    index++;
                    var translatex = -index * width;
                    ul.style.transition = 'all .3s';
                    ul.style.transform = 'translateX(' + translatex + 'px)';
                }, 2000);
            })
        })
        // 返回顶部
    let goBack = document.querySelector(".goBack")
    let nav = document.querySelector("nav")
    window.addEventListener("scroll", function() {
        if (window.pageYOffset > nav.offsetTop) {
            goBack.style.display = "block"
        } else {
            goBack.style.display = "none"
        }
    })
    goBack.addEventListener("click", function() {
        window.scroll(0, 0)
    })
})