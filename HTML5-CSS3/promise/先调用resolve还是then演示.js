// 问：改变 promise 状态和【指定回调】函数谁先谁 注意：是指定，不是执行
// 答：都有可能先。
// https://www.bilibili.com/video/BV1GA411x7z1?p=20
let p = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve("ok") // then方法先被指定，等待定时器到时，改变状态，再执行函数
    }, 2000)

})
p.then(res => {
    console.log(res)
    return "123"
}).then(res => {
    console.log(res);
})