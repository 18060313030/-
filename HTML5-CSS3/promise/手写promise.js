function Promise(executor) {
    this.PromiseState = "pedding"
    this.PromiseResult = null

    // resolve函数和reject函数中this指向window,所以需要传递一个this给它们
    const self = this

    // 定义一个对象,保存then中的成功和失败的回调函数
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
    return new Promise((resolve, reject) => {
        // 根据Promise实例对象中使用的方法,调用then中不同的回调
        if (this.PromiseState === "fulfilled") {
            let result = onResolved(this.PromiseResult)
            if (result instanceof Promise) {
                result.then(res => {
                    resolve(res)
                }, error => {
                    reject(error)
                })
            } else {
                resolve(result)
            }
        }
        if (this.PromiseState === "rejected") {
            onRejected(this.PromiseResult)
        }
        // 如果Promise中是异步的方法,按照代码执行顺序,会直接先指定then方法,此时Promise的状态还是pendding
        if (this.PromiseState === "pedding") {
            // 等到Promise中的异步代码执行完毕,Promise的状态确定了,就会执行then方法.
            this.callback.push({
                onResolved,
                onRejected
            })
        }
    })
}