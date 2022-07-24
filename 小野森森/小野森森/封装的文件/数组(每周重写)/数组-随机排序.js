let arr = [1, 2, 3, 4]

arr.sort(function(a, b) {
    let random = Math.random()
    if (random - 0.5 > 0) {
        return 1
    } else {
        return -1
    }
    // return Math.random - 0.5 // 上面的操作简写成这样
})
console.log(arr);