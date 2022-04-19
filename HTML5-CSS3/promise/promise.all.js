let p1 = new Promise((resolve, reject) => {
    resolve("ok")
})

let p2 = Promise.resolve("hello")

let p3 = Promise.resolve("error")

let result = Promise.all([p1, p2, p3])
result.then(res => {
    console.log(res);
}).catch(err => console.log(err))