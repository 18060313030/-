// splice(index, number, ele1,ele2...)
// 重写数组原型上的unshift()方法
let arr = [1, 2, 3, 4]

// 第一种 自己写的
// Array.prototype.myUnshift = function() {
//     // 把传入的参数，从最后一位开始，依次放在头部
//     for (let i = arguments.length - 1; i >= 0; i--) {
//         this.splice(0, 0, arguments[i])
//     }
//     return this.length
// }

// 第二种 教程提供 splice(添加位置,0,添加的元素) 让添加位置不断向后移动
// Array.prototype.myUnshift = function() {
//     let argsLen = arguments.length
//     for (let i = 0; i < argsLen; i++) {
//         this.splice(i, 0, arguments[i])
//     }
//     return this.length
// }

// 第三种 教程提供 使用concat连接数组,要先将类数组arguments转换成数组
Array.prototype.myUnshift = function() {
    let args = Array.prototype.slice.call(arguments)
    return args.concat(this)
}

console.log(arr.myUnshift(5, 6));
console.log(arr);