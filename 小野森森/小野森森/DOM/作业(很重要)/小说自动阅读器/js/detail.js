/* 
 * 构造函数需要传入两个参数 stopBtn  playBtn
 * let autoReader = new AutoReader({
 *   stopBtn: document.getElementsByClassName("arrowUp")[0],
 *   playBtn: document.getElementsByClassName("play")[0]
 * })
 */
;
(function() {
    let wHeight = getScrollSize().height, // 所有内容的宽高
        vHeight = getViewPortSize().height, // 视口的宽高
        play = false, // 是否播放，false未播放
        timer = null // 定时器

    function AutoReader(opt) {
        this.stopBtn = opt.stopBtn
        this.playBtn = opt.playBtn
        _self = this // this默认指向被绑定的DOM元素,需要使用外部定义的指向AutoReader构造函数的this

        // 点击回到顶部
        addEvent(this.stopBtn, "click", function() {
            window.scroll(0, 0)
            clearInterval(timer)
            _self.playBtn.className = "iconfont icon-bofang play"
        })

        // 滚动页面
        addEvent(window, "scroll", function() {
            _self.stopBtnShow()
        })

        // 播放按钮
        addEvent(this.playBtn, "click", function() {
            _self.playReader()
        })
    }
    AutoReader.prototype = {
        // 显示与隐藏按钮元素
        stopBtnShow: function() {
            let topDistance = getScrollOffset().top, // 获取滚动出屏幕的内容高度
                stopBtn = this.stopBtn // 将按钮元素节点对象使用变量缓存
            stopBtn.style.display = topDistance ? "block" : "none"
        },

        // 播放按钮回调函数
        playReader: function() {
            let outHeight = getScrollOffset().top, // 获取滚出屏幕的距离
                _self = this
            if (wHeight <= vHeight + outHeight) {
                return
            }
            if (!play) {
                timer = setInterval(() => {
                    let outHeight = getScrollOffset().top
                    if (wHeight <= vHeight + outHeight + 2) {
                        clearInterval(timer)
                        _self.playBtn.className = "iconfont icon-bofang play"
                        play = false
                    } else {
                        window.scrollBy(0, 1)
                        _self.playBtn.className = "iconfont icon-tubiaozhizuomoban play"
                    }
                }, 20);
                play = true
            } else {
                _self.playBtn.className = "iconfont icon-bofang play"
                clearInterval(timer)
                play = false
            }
        }
    }
    window.AutoReader = AutoReader
})()