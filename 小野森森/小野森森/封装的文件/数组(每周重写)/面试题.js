/**
 *  找出字符串里面第一个出现的且不重复的值
 */

String.prototype.getFirstOneStr = function() {
    let obj = {},
        strLen = this.length

    for (let i = 0; i < strLen; i++) {
        if (obj.hasOwnProperty(this[i])) { // 对像中如果存在该属性
            obj[this[i]]++ // 该属性的值加1
        } else {
            obj[this[i]] = 1 // 该属性设为1
        }
    }
    console.log(obj);
    for (const key in obj) { // 遍历对象
        if (obj[key] === 1) { // 第一个出现且不重复的值
            return key
        }
    }
}
let str = "囧昂gcgffhhjjaeeii啊"
console.log(str.getFirstOneStr());