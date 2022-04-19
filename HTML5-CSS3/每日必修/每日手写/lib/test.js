function Promise(executor) {
    this.PromiseState = "pedding "
    this.PromiseResult = null

    // resolve函数和reject函数中this指向window,所以需要传递一个this给它们
    const self = this
        // 定义一个数组,保存then中的成功和失败的回调函数对象
    const callback = []

    function resolve(data) {
        if (self.PromiseState !== "pedding") return
        self.PromiseState = "fulfilled "
        self.PromiseResult = data

        self.callback.forEach(item => {
            item.onResolved(data)
        })
    }

    function reject(data) {
        if (self.PromiseState !== "pedding") return
        self.PromiseState = "rejected "
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
// 【then方法】
Promise.prototype.then = (onResolved, onRejected) => {
    const self = this
        // 封装函数
    function callback(type) {
        // 对返回的结果进行判断
        let result = type(self.PromiseResult)
            // 返回的结果是Promise对象
        if (result instanceof Promise) {
            result.then(res => {
                resolve(res)
            }, err => {
                reject(err)
            })
        } else {
            // 如果不是Promise对象,状态都为成功
            resolve(result)
        }
    }
    return new Promise((resolve, reject) => {
        // 根据Promise实例对象中返回的结果,调用then中不同的回调
        if (this.Promisestate === "fulfilled ") {
            callback(onResolved)
        }
        if (this.Promisestate === "rejected ") {
            callback(onRejected)
        }
        // 如果Promise中是异步的方法,按照代码执行顺序,会直接先指定	then方法,此时Promise的状态还是pendding
        if (this.Promisestate === "pedding ") {
            // 等到Promise中的异步代码执行完毕,Promise的状态确定了,	就会执行then方法.
            this.callback.push({
                onResolved: function() {
                    callback(onResolved)
                },
                onRejected: function() {
                    callback(onRejected)
                }
            })
        }
    })
}