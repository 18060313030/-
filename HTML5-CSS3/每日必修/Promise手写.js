function Promise(executor) {
    this.PromiseState = "pedding"
    this.PromiseResult = null
    let self = this
    this.callback = []

    function resolve(data) {
        if (self.PromiseState !== "pedding") return
        self.PromiseState = "fulfilled"
        self.PromiseResult = data

        self.callback.forEach(item => {
            item.onResolved(data)
        })
    }

    function reject(data) {
        if (self.PromiseState !== "pedding") return
        self.PromiseState = "rejected"
        self.PromiseResult = data

        self.callback.forEach(item => {
            item.onRejected(data)
        })
    }

    try {
        executor(resolve, reject)
    } catch (e) {
        reject(e)
    }
}

Promise.prototype.then = function(onResolved, onRejected) {
    let self = this
    return new Promise((resolve, reject) => {
        if (typeof onRejected !== "function") {
            onRejected = (reason) => { throw reason }
        }
        if (typeof onResolved !== "function") {
            onResolved = value => value
        }

        function handler(type) {
            try {
                let result = type(self.PromiseResult)
                if (result instanceof Promise) {
                    result.then(value => {
                        resolve(value)
                    }, reason => {
                        reject(reason)
                    })
                } else {
                    resolve(result)
                }
            } catch (e) {
                reject(e)
            }
        }
        if (this.PromiseState === "fulfilled") {
            handler(onResolved)
        }
        if (this.PromiseState === "rejected") {
            handler(onRejected)
        }
        if (this.PromiseState === "pedding") {
            this.callback.push({
                onResolved: function() {
                    handler(onResolved)
                },
                onRejected: function() {
                    handler(onRejected)
                }
            })
        }
    })
}

Promise.prototype.catch = function(onRejected) {
    return this.then(undefined, onRejected)
}

Promise.resolve = function(data) {
    return new Promise((resolve, reject) => {
        if (data instanceof Promise) {
            data.then(value => {
                resolve(value)
            }, reason => {
                reject(reason)
            })
        } else {
            resolve(data)
        }
    })
}

Promise.reject = function(data) {
    return new Promise((resolve, reject) => {
        reject(data)
    })
}

Promise.all = function(promiseArr) {
    return new Promise((resolve, reject) => {
        let count = 0
        let arr = []
        for (let i = 0; i < promiseArr.length; i++) {
            promiseArr[i].then(value => {
                count++
                arr[i] = value
                if (count === promiseArr.length) {
                    resolve(arr)
                }
            }, reason => {
                reject(reason)
            })
        }
    })
}

Promise.race = function(promiseArr) {
    return new Promise((resolve, reject) => {
        for (let i = 0; i < promiseArr.length; i++) {
            promiseArr[i].then(value => {
                resolve(value)
            }, reason => {
                reject(reason)
            })
        }
    })
}