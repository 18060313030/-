// 插件制作方法处理
;
(function() {
    function SwipeImg(opt) {
        this.thumbImg = document.getElementsByClassName(opt.thumbImg) // 大图片元素
        this.slideImg = document.getElementsByClassName(opt.slideImg) // 小图片元素
        this.clickFn() // 外部创建实例对象后，立即执行原型上的点击方法
    }

    clickFn.prototype = {
        swipe: function() {
            let thumbImg = this.thumbImg,
                slideImg = this.slideImg
                // 循环遍历小图片类数组，给每个元素加上点击事件
            for (let i = 0; i < slideImg.length; i++) {
                slideImg[i].onclick = function() {
                    for (let j = 0; j < slideImg.length; j++) {
                        slideImg[j].className = "slide_item"
                        thumbImg[j].className = "thumb_item"
                    }
                    slideImg[i].className += " active"
                    thumbImg[i].className += " mask"
                }
            }
        }
    }
    window.SwipeImg = SwipeImg
})()