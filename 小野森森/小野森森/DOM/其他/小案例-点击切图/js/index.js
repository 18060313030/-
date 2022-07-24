// 获取大图片元素类数组
let thumbImg = document.getElementsByClassName("thumb_item")

// 获取小图片元素类数组
let slideImg = document.getElementsByClassName("slide_item")

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
// 使用var声明时，需要使用闭包处理
// for (var i = 0; i < slideImg.length; i++) {
//   (function(j) {
//       slideImg[j].onclick = function() {
//           for (var k = 0; k < slideImg.length; k++) {
//               slideImg[k].className = "slide_item"
//               thumbImg[k].className = "thumb_item"
//           }
//           slideImg[j].className += " active"
//           thumbImg[j].className += " mask"
//       }
//   })(i)
// }