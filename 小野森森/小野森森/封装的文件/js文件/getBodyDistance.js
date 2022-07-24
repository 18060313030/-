/*
 * 寻找当前元素距离body的距离
 */
function getBodyDistance(ele) {
    let eleFather = ele.offsetParent, // 获取父级定位元素
        left = ele.offsetLeft, // 获取距离父级定位元素左边界的距离
        top = ele.offsetTop; // ....上边界...
    while (eleFather) { // 循环查看是否还有定位的父级元素
        left += eleFather.offsetLeft // 累加距离
        top += eleFather.offsetTop // 累加距离
        eleFather = eleFather.offsetParent // 将父级定位元素获取到
    }
    return {
        left,
        top
    }
}