/* 判断100以内的质数 */
let count = 0 // 计数器

// 1既不是质数也不是和数，所以从2开始遍历
for (let i = 2; i < 100; i++) {
    // 除数不能大于被除数 除数j<=被除数i
    for (let j = 1; j <= i; j++) {
        if (i % j == 0) {
            count++
        }
    }
    // 质数只能被1或自己整除,所以整除记录只能为2
    if (count == 2) {
        console.log(i);
    }
    // 重置计数器
    count = 0
}