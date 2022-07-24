/**
 * 封装typeof 函数
 */

function myTypeof(value) {
    let type = typeof(value), // 先判断value的类型
        toStr = Object.prototype.toString,
        obj = {
            "[object Array]": "array",
            "[object Object]": "object",
            "[object Number]": "object Number",
            "[object String]": "object string",
            "[object Boolean]": "object Boolean"
        }

    if (value === null) {
        return "null"
    } else if (type === "object") {
        let key = toStr.call(value) // key值是[object Array]等
        return obj[key]
    } else {
        return type
    }
}

console.log(myTypeof(function() {}));

// function myTypeof(value) {
//     let toStr = Object.prototype.toString,
//         type = toStr.call(value),
//         condition = type.slice(8, -1)
//     switch (condition) {
//         case "String":
//             return "string"
//         case "Number":
//             return "number"
//         case "Boolean":
//             return "boolean"
//         case "Null":
//             return "null"
//         case "Undefined":
//             return "undefined"
//         case "Array":
//             return "array"
//         case "Object":
//             return "object"
//         case "Function":
//             return "function"
//         case "RegExp":
//             return "regExp"
//         case "Date":
//             return "date"
//     }
// }