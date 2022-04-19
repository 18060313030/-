let p = new Promise((resolve, reject) => {
    // resolve()  // pendding ==> resolved
    // reject()   // pendding ==> rejected
    throw "error" // pendding ==> rejected
})
p.catch(err => err)
console.log(p);