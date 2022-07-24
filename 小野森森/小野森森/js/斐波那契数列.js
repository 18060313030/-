// 1 1 2 3 5 8

let n = parseInt(window.prompt("请输入斐波那契数列的数值："))

while (Number.isNaN(n)) {
    window.alert("请输入正确的数值！")
    n = parseInt(window.prompt("请输入斐波那契数列的数值："))
}

// 插件制作法
;
(function() {
    function fibonacci(n) {
        if (n < 2) {
            return 1
        }
        return fibonacci(n - 1) + fibonacci(n - 2)
    }
    window.fibonacci = fibonacci
})()
fibonacci(2)

// for循环
function fibonacci(n) {
    let num1 = 1
    let num2 = 1
    let sum = num2
    let arr = [1, 1]
    if (n == 1) {
        return 1
    }
    if (n == 2) {
        return arr
    }
    for (let i = 2; i < n; i++) {
        sum = num1 + num2
        num1 = num2
        num2 = sum
        arr.push(num2)
    }
    console.log(arr)
}

// let n = parseInt(window.prompt("请输入需要查找的第N位的斐波那契数列："))
// 函数递归
function fibonacciRecusion(n) {
    if (n <= 2) {
        return 1
    }
    return fibonacciRecusion(n - 1) + fibonacciRecusion(n - 2)
}