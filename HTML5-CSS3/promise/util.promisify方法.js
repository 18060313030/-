// util.promisify()
// 该方法将基于回调的函数转换为基于 Promise 的函数。这使您可以将 Promise 链和 async/await 与基于回调的 API 结合使用
const util = require("util")
const fs = require("fs")

let fsPro = util.promisify(fs.readFile)

fsPro("text", "utf-8").then(res => console.log(res))