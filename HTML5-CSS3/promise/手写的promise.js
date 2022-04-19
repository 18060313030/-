// 手写promise
// 声明构造函数
function Promise(executor) {
    // 原生的promise自带内置属性[[PromiseState]]: "fulfilled"、[[PromiseResult]]: "ok"
    // 其中PromiseState表示状态(pendding,fulfilled,rejected)，PromiseResult表示resolve("ok")里面传入的参数
    this.PromiseState = "pedding"
    this.PromiseResult = null

    this.callback = [] // 定义一个对象数组，接收then里面成功，失败的回调函数对象

    const self = this // 保存指向实例对象的this

    // 1、通过resolve函数修改状态
    function resolve(data) {
        // 这里边的this指向了window,需要在外面定义一个self(自定义名称)指向promise实例对象的this
        // console.log(this)
        // 【promise的状态只能改变一次】
        if (self.PromiseState !== "pedding") return
        self.PromiseState = "fulfilled"
        self.PromiseResult = data

        // then是异步的微任务,加一个定时器
        setTimeout(() => {
            // Promise对象异步请求结束时，如果调用的是resolve()
            self.callback.forEach(item => {
                item.onResloved(data)
            })
        });
    }
    // 2、通过reject函数修改状态
    function reject(data) {
        if (self.PromiseState !== "pedding") return
        self.PromiseState = "rejected"
        self.PromiseResult = data

        // then是异步的微任务,加一个定时器
        setTimeout(() => {
            // Promise对象异步请求结束时，如果调用的是reject()
            self.callback.forEach(item => {
                item.onRejected(data)
            })
        })
    }

    try {
        // 【同步调用执行器函数】new Promise((resolve,reject)=>{}) 原生的Promise参数是一个执行器函数
        executor(resolve, reject)
    } catch (e) {
        // 3、通过throw抛出的异常修改状态
        reject(e)
    }

}
// 【定义then方法】
Promise.prototype.then = function(onResloved, onRejected) {
    // then被Promise的实例对象调用，this指向这个实例对象
    const self = this
    return new Promise((resolve, reject) => {
        // 如果then的错误回调没有写,那么保存到callback数组里面的onRejected属性值就是undefined
        // then就会报错,需要判断错误的回调是否是函数
        if (typeof onRejected !== "function") {
            onRejected = err => { throw err }
        }

        // then可以直接简写成then().then(res=>...).catch()
        // 此时onResloved和onRejected都为undefined,所以还需要对onResloved不为函数时进行判断
        if (typeof onResloved !== "function") {
            onResloved = res => res
        }

        // 封装函数
        function callback(type) {
            try {
                // 返回的结果对象
                let result = type(self.PromiseResult)
                    // 判断结果对象
                if (result instanceof Promise) {
                    // 如果是Promise的实例,使用then方法判断其返回结果
                    result.then(res => {
                        resolve(res)
                    }, err => {
                        reject(err)
                    })
                } else {
                    // 如果是普通的对象(非promise),结果都是resolved
                    resolve(result)
                }
            } catch (e) {
                reject(e)
            }
        }
        // promise实例对象返回的状态是成功的
        if (this.PromiseState === "fulfilled") {
            setTimeout(() => {
                callback(onResloved)
            });
        }
        // promise实例对象返回的状态是失败的
        if (this.PromiseState === "rejected") {
            setTimeout(() => {
                callback(onRejected)
            });
        }
        // promise中进行异步操作,导致指定then函数时状态是pedding
        if (this.PromiseState === "pedding") {
            // 对象callback在promise构造函数内部定义的
            // 为了保证多个then能被执行，而不是覆盖，callback需要是一个数组
            this.callback.push({
                onResloved: function() {
                    callback(onResloved)
                },
                onRejected: function() {
                    callback(onRejected)
                }
            })
        }
    })
}

// 【定义catch方法】
Promise.prototype.catch = function(onRejected) {
    return this.then(undefined, onRejected)
}

// 【定义resolve方法,该方法是函数的方法】
Promise.resolve = function(value) {
    // 该方法返回一个Promise对象,方法返回的结果状态由传入的参数值决定
    // 参数是非promise对象，状态为成功。参数是prommise对象，状态由该promise对象决定
    return new Promise((resolve, reject) => {
        if (value instanceof Promise) {
            value.then(res => {
                resolve(res)
            }, err => {
                reject(err)
            })
        } else {
            resolve(value)
        }
    })
}

// 【定义reject方法】
Promise.reject = function(err) {
    return new Promise((resolve, reject) => {
        reject(err)
    })
}

// 【定义all方法】
Promise.all = function(promiseArr) {
    return new Promise((resolve, reject) => {
        // 数组中的Promise对象都成功才改变Promise状态为成功
        // 数组中有一个失败,直接返回该失败对象的结果,Promise状态为失败

        let count = 0
        let arr = []
        for (let i = 0; i < promiseArr.length; i++) {
            promiseArr[i].then(res => {
                // 必须要一起成功才改变状态
                count++
                // 为了保证数组顺序不混乱,不使用push方法(Promise对象结果的返回先后顺序无法确定)
                arr[i] = res

                // 最终的成功结果(PromiseResult)是一个数组.存放所有Promise对象的成功返回结果
                if (count === promiseArr.length) {
                    resolve(arr)
                }
            }, err => {
                reject(err)
            })
        }
    })
}

// 【定义race方法】
Promise.race = function(promiseArr) {
    return new Promise((resolve, reject) => {
        for (let i = 0; i < promiseArr.length; i++) {
            promiseArr[i].then(res => {
                resolve(res)
            }, err => {
                reject(err)
            })
        }
    })
}