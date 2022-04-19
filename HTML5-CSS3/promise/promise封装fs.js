const { rejects } = require("assert")
let fs = require("fs")
const { resolve } = require("path")
    // fs.readFile("./text", "utf-8", (err, data) => {
    //     if (err) throw err
    //     console.log(data);
    // })

// let p = new Promise((resolve, reject) => {
//     fs.readFile("./text", "utf-8", (err, data) => {
//         if (err) return reject(err)
//         resolve(data)
//     })
// })
// p.then((res) => {
//     console.log(res);
// }).catch(err => console.log(err))

let myFs = function(path) {
    return new Promise((resolve, reject) => {
        fs.readFile(path, "utf-8", (err, data) => {
            if (err) return reject(err)
            return resolve(data)
        })
    })
}
myFs('text').then(res => {
    console.log(res);
}).catch(err => console.log(err))