// 问：一个 promise 指定多个成功/失败回调函数, 都会调用吗?
// 答：当promise改变为对应状态时都会调
let p = new Promise((resolve, reject) => {
    resolve("ok")
})

p.then(res => console.log(res))
p.then(res => console.log(res))