// promise返回的是一个新promise对象，那么返回的新promise对象结果将影响最终结果
let p = Promise.resolve(new Promise((resolve, reject) => {
    reject("error")
}))
p.then(res => console.log(res)).catch(err => console.log(err))

// promise返回的是一个非promise对象，那么返回的结果都是resolve
let p2 = Promise.resolve("123")
p2.then(res => console.log(res)).catch(err => console.log(err))

// Promise.reject() 返回的都是失败
let p3 = Promise.reject("456")
p3.then(res => console.log(res)).catch(err => console.log(err))
console.log(p3);