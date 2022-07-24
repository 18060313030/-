// charCodeAt() 0-255单个字节 大于255两个字节
let arr = ["蜡笔小新", "野原新之助", "风间彻", "1234"]

// 获取字节数的方法
function getBytes(str) {
    let num = str.length
    for (let j = 0; j < str.length; j++) {
        if (str.charCodeAt(j) > 255) {
            num++
        }
    }
    return num
}

// 按照字节数排序
arr.sort(function(a, b) {
    return getBytes(a) - getBytes(b)
})
console.log(arr);