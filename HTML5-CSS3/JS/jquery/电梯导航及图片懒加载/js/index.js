$(function() {
    // 因为点击按钮会滚动到对应的页面，同时会触发滚动页面的事件，
    // 滚动页面事件中有一个修改对应导航按钮样式的功能，会导致点击按钮时，按钮样式变化有bug
    // 所以需要在点击按钮时关闭滚动事件，这时就设置一个节流/互斥锁来完成该功能
    let flag = true // 节流阀/互斥锁 
        // 显示电梯导航的距离
    let toolTop = $(".recommend").offset().top
    showHideNav()

    // 封装显示和隐藏电梯导航按钮的函数
    function showHideNav() {
        if ($(document).scrollTop() > toolTop) {
            $(".fixedtool").fadeIn()
        } else {
            $(".fixedtool").fadeOut()
        }
    }

    // 页面滚动事件
    $(window).scroll(function() {
        showHideNav()

        if (flag) {
            // 页面滚动到某个内容区域，左侧电梯导航小li相应添加和删除current类名
            $(".floor .w").each(function(index, domEle) { // 遍历每一个内容 得到内容和内容的索引
                if ($(document).scrollTop() + 2 >= $(domEle).offset().top) { // 当页面滚动 大于 内容距离文档顶部的距离，就意味着已经滚动到某个内容了
                    $(".fixedtool li").eq(index).addClass("current").siblings().removeClass("current") // 根据内容对应的索引找到对应的导航按钮，修改样式
                }
            })
        }
    })

    // 点击电梯导航，切换到对应的区域
    $(".fixedtool li").click(function() {
        flag = false // 设置节流阀
            // 跳转位置
        let index = $(this).index() // 获取按钮的索引
        let goodsTop = $(".floor .w").eq(index).offset().top // 获取对应索引的商品位置
        $("body,html").stop().animate({ // 跳转到指定位置
            scrollTop: goodsTop
        }, function() {
            flag = true // 完成按钮点击时，开启页面滚动事件
        })

        // 点击按钮切换按钮样式
        $(this).addClass("current").siblings().removeClass("current")
    })
    lazyLoadInit()
    lazyLoadInit({
        coverColor: "white",
        coverDiv: "",
        offsetBottom: 0,
        offsetTopm: 0,
        showTime: 1100,
        onLoadBackEnd: function(i, e) {
            console.log("onLoadBackEnd:" + i);
        },
        onLoadBackStart: function(i, e) {
            console.log("onLoadBackStart:" + i);
        }
    });
})