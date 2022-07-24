;
(function() {
    let wHeight = getScrollSize().height,
        vHeight = getViewPortSize().height,
        timer = null,
        play = false

    function AutoReader(opt) {
        this.stopBtn = opt.stopBtn
        this.playBtn = opt.playBtn
        let _self = this

        // window页面滚动事件
        addEvent(window, "scroll", function() {
            _self.stopBtnShow()
        })

        // 点击回到顶部按钮
        addEvent(this.stopBtn, "click", function() {
            window.scroll(0, 0)
            clearInterval(timer)
            _self.playBtn.className = "iconfont icon-bofang play"
        })

        // 点击自动播放按钮
        addEvent(this.playBtn, "click", function() {
            _self.playAuto()
        })
    }

    AutoReader.prototype = {
        // 页面滚动,隐藏与显示回到顶部按钮
        stopBtnShow() {
            let top = getScrollOffset().top,
                stopBtn = this.stopBtn;
            stopBtn.style.display = top ? "block" : "none"
        },

        // 播放按钮
        playAuto() {
            let top = getScrollOffset().top
            let _self = this
            if (wHeight <= vHeight + top + 2) {
                return
            }
            if (!play) {
                timer = setInterval(function() {
                    let top = getScrollOffset().top
                    if (wHeight <= vHeight + top + 2) {
                        clearInterval(timer)
                        _self.playBtn.className = "iconfont icon-bofang play"
                        play = false
                    } else {
                        window.scrollBy(0, 1)
                        _self.playBtn.className = "iconfont icon-tubiaozhizuomoban play"
                    }
                }, 20)
                play = true
            } else {
                clearInterval(timer)
                _self.playBtn.className = "iconfont icon-bofang play"
                play = false
            }
        }
    }

    window.AutoReader = AutoReader
})()