window.onload = function() {
    let preview_img = document.querySelector(".preview_img")
    let mask = document.querySelector(".mask")
    let big = document.querySelector(".big")
        // 1、鼠标移动到图片上时，显示遮罩层和放大图
    preview_img.addEventListener("mouseover", function() {
            mask.style.display = "block"
            big.style.display = "block"
        })
        // 2、鼠标移出时，隐藏遮罩层和放大图
    preview_img.addEventListener("mouseout", function() {
            mask.style.display = "none"
            big.style.display = "none"
        })
        // 3、鼠标移动时，遮罩层跟着移动
    preview_img.addEventListener("mousemove", function(e) {
        let x = e.pageX - this.offsetLeft
        let y = e.pageY - this.offsetTop
        console.log(x + "," + y);
        // 需要将鼠标位置放置到遮罩层中间，就需要减去遮罩层自身大小的一半
        // 遮挡层实时移动距离
        maskY = y - (mask.offsetHeight / 2)
        maskX = x - (mask.offsetWidth / 2)
            // 遮罩层最大移动距离(大的减去小的),因为是都是正方形，所以长度方向上的也是一样，就不用求了
        let maskMaxXY = preview_img.offsetWidth - mask.offsetWidth
            // 判断遮罩层距离图片盒子边框为0时就等于0（放置超出范围）
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
        bigMax = bigImg.offsetWidth - big.offsetWidth // 大图片最大移动距离(因为是正方形所以x和y是一样的，就只写一个了)
            // 大图片的移动距离 = 遮挡层移动距离 * 大图片最大移动距离 / 遮挡层的最大移动距离
        bigX = maskX * bigMax / maskMaxXY
        bigY = maskY * bigMax / maskMaxXY
        bigImg.style.left = -bigX + "px"
        bigImg.style.top = -bigY + "px"
    })
}