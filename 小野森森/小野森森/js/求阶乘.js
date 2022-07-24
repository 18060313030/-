// 求出第N个数的阶乘

let n = parseInt(window.prompt("求出第N个数的阶乘："))

// for循环
// function factorial(n) {
//     let res = 1
//     for (let i = 1; i <= n; i++) {
//         res *= i
//     }
//     return res
// }
// console.log(factorial(n))

// 递归
function factorialRecusion(n) {
    if (n === 1) {
        return n
    }
    return n * factorialRecusion(n - 1)
}
console.log(factorialRecusion(n))