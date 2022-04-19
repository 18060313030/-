window.onload = function() {
    // 侧边栏切换
    let titles = document.querySelectorAll(".tab_title li")
    let divs = document.querySelectorAll(".tab_item div")
    tabSwitch(titles, divs);
    // 商品信息切换
    let tabs = document.querySelectorAll(".tab a")
    let lists = document.querySelectorAll(".tab_list ul")
    tabSwitch(tabs, lists);
    // 封装切换方法
    function tabSwitch(btn, content) {
        for (let j = 0; j < btn.length; j++) {
            btn[j].addEventListener("click", function() {
                for (let j = 0; j < btn.length; j++) {
                    btn[j].className = ""
                    content[j].style.display = "none"
                }
                this.className = "active"
                content[j].style.display = "block"
            })
        }
    }


    // 鼠标放大镜效果
    let img_scope = document.querySelector(".goods_img")
    let mask = document.querySelector(".mask")
    let big = document.querySelector(".big");
    // 1、鼠标移动/离开 遮罩层位置，遮罩层和大图片显示/隐藏
    img_scope.addEventListener("mouseover", function() {
        mask.style.display = "block"
        big.style.display = "block"
    })
    img_scope.addEventListener("mouseout", function() {
        mask.style.display = "none"
        big.style.display = "none"
    })

    // 节流阀
    let timer = null
        // 2、遮罩层跟着鼠标移动
    img_scope.addEventListener("mousemove", function(e) {
        if (timer) return
        let x = e.pageX - this.offsetLeft
        let y = e.pageY - this.offsetTop
        timer = setTimeout(function() {

            console.log(x + "," + y);
            // 需要将鼠标位置放置到遮罩层中间，就需要减去遮罩层自身大小的一半
            // 遮挡层实时移动距离
            maskY = y - (mask.offsetHeight / 2)
            maskX = x - (mask.offsetWidth / 2);
            // 遮罩层最大移动距离(大的减去小的),因为是都是正方形，所以长度方向上的也是一样，就不用求了
            let maskMaxXY = img_scope.offsetWidth - mask.offsetWidth;
            // 判断遮罩层距离图片盒子边框为0时就等于0（防止超出范围）
            if (maskX <= 0) {
                maskX = 0
            } else if (maskX >= maskMaxXY) {
                maskX = maskMaxXY
            }
            if (maskY <= 0) {
                maskY = 0
            } else if (maskY >= maskMaxXY) {
                maskY = maskMaxXY
            }
            // 遮罩层的left和top值是：鼠标距离body的距离 减去 img图片边框距离body的距离，
            // 将值赋值给遮罩层的left和top
            mask.style.left = maskX + "px"
            mask.style.top = maskY + "px"

            // 设置放大图的移动
            bigImg = document.querySelector(".bigImg")
            bigMax = bigImg.offsetWidth - big.offsetWidth; // 大图片最大移动距离(因为是正方形所以x和y是一样的，就只写一个了)
            // 大图片的移动距离 = 遮挡层移动距离 * 大图片最大移动距离 / 遮挡层的最大移动距离
            bigX = maskX * bigMax / maskMaxXY
            bigY = maskY * bigMax / maskMaxXY
            bigImg.style.left = -bigX + "px"
            bigImg.style.top = -bigY + "px"
            timer = null
        }, 20)
    })
}