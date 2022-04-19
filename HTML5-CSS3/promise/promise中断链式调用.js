// 问：如何中断 promise
// 答：在then链中，返回一个状态为pendding的promise对象

let p = new Promise((resolve, reject) => {
    resolve("ok")
})

p.then(res => {
    console.log(res); // 在then链中，返回一个状态为pendding的promise对象
}).then(res => {
    console.log("123");
}).then(res => {
    console.log(res);
})