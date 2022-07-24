let arr = [1, 2, 3]
Array.prototype.myPush = function() {
    for (let i = 0; i < arguments.length; i++) {
        this[this.length] = arguments[i] // this指向调用该方法的调用者也就是arr数组， arr数组长度为3, arr[3] = arguments[0] 以此类推 
    }
    return this.length // 返回调用了myPush方法之后的数组长度
}

console.log(arr.myPush(2, 3, 4, 5, 6));
console.log(arr);