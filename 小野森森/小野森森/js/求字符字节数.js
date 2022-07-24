/*
 * ASCII码有两张表 ，1表是0-127 ，2表是128-255 在该表上一个字符都是一个字节
 * UNICODE码前面和ASCII完全一样，就是说0-255都是一个字节的，255之后都是2个字节
 * 写一个函数，接收任意字符串，求出字符串的总字节数
 * 使用方法 str.charCodeAt(0)
 */

// 初始版本
function getByte(str) {
    let num = 0
    for (let i = 0; i < str.length; i++) {
        if (str.charCodeAt(i) <= 255) {
            num += 1
        } else {
            num += 2
        }
    }
    return num
}
console.log(getByte("!@#$"));

console.log("=============");
// 优化版本
function getBytePro(str) {
    let bytes = str.length // 有多少字符就给多少长度的字节
    for (let i = 0; i < bytes; i++) {
        // 只需要判断2字节的字符，然后在原有基础上加1即可
        if (str.charCodeAt(i) > 255) {
            bytes++
        }
    }
    return bytes
}
console.log(getBytePro("你好"));