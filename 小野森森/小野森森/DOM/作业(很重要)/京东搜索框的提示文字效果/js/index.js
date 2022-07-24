window.onload = function() {
    init()
}

function init() {
    autoKw()
}

let autoKw = (function() {
    let sInput = document.getElementById("J_search_input"),
        kw = document.getElementById("j_kw"),
        kw_mock = JSON.parse(document.getElementsByClassName("kw_mock")[0].innerHTML),
        num = 0,
        timer = null

    // input框获取焦点
    addEvent(sInput, "focus", function() {
        clearInterval(timer)
        kw.style.color = "#ccc"
    })

    // input输入事件
    addEvent(sInput, "input", function() {
        setKwShow(this.value)
    })

    // 处理input事件的兼容性事件
    addEvent(sInput, "propertychange", function() {
        setKwShow(this.value)
    })

    // input失去焦点
    addEvent(sInput, "blur", function() {
        setKwShow(this.value, true)
        timer = setInterval(changeKw, 5000)
    })

    // 显示与隐藏关键词
    function setKwShow(val, isblur = false) {
        if (val.length <= 0) {
            kw.className = "j_kw show"
            kw.style.color = isblur ? "#989898" : "#ddd"
        } else {
            kw.className = "j_kw hide"
        }
    }

    // 自动轮播关键词
    function autoKw() {
        changeKw() // 首次加载页面时,显示关键字
        timer = setInterval(changeKw, 5000)
    }

    // 改变关键词
    function changeKw() {
        let kwsLen = kw_mock.length;
        kw.innerHTML = kw_mock[num]

        // 数组的边界判断
        num = num >= kwsLen - 1 ? 0 : num + 1
    }

    /**
     * 为什么给一个函数返回出去呢?
     * 可以在返回的函数上定义形参
     * 在autoKw()里面传参数,从而在返回的函数里面做更多的操作
     */
    return function() {
        autoKw()
    }
})()