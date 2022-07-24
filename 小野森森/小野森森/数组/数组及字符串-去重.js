// Array.prototype.unique = function() {
//     let arrSet = new Set(this)
//     return Array.from(arrSet)
// }

// Array.prototype.unique = function() {
//     let arr = []
//     for (let i = 0; i < this.length; i++) {
//         if (arr.indexOf(this[i]) === -1) {
//             arr.push(this[i])
//         }
//     }
//     return arr
// }

// 教程提供
// 该方法通过对象的key来进行过滤数组的重复值
Array.prototype.unique = function() {
    let obj = {},
        arr = [],
        arrLen = this.length
    for (let i = 0; i < arrLen; i++) {
        if (!obj.hasOwnProperty(this[i])) { // 对象的key里面没有数组的元素 
            obj[this[i]] = this[i] // 这里的value值随便是哪一个都行，去重是根据对象的键不能重复来完成的
            arr.push(this[i])
        }
    }
    return arr
}
let arr = [0, 0, 1, 1, 2, 3, 4, 4, "ni", "ni"]
console.log(arr.unique());

console.log("=============");

// 字符串去重 和数组去重原理一样,就是将数组push变成了字符串拼接
String.prototype.unique = function() {
    let obj = {},
        str = "",
        arrLen = this.length

    for (let i = 0; i < arrLen; i++) {
        if (!obj.hasOwnProperty(this[i])) {
            obj[this[i]] = this[i]
            str += this[i]
        }
    }
    return str
}
console.log("arrasd".unique());