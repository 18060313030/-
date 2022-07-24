// 使用闭包缓存值
function cache(num = 10) {
    // let n = arguments[0] || 10 // 兼容性写法
    function add() {
        num++
        console.log(num)
    }

    function reduce() {
        num--
        console.log(num)
    }
    return [add, reduce]
}
let operator = cache(20)
operator[0]()
operator[1]()

/*
 * 解释
 * cache函数执行时创建cache的执行上下文,在cache上下文中通过函数的内部属性[[scope]]维护了一条作用域链
 * 到了初始化add和reduce函数时,也会维护一条和cache一样维护了一条作用域链, 全局[[scope]] --> cache[[scope]] --> add[[scope]] / reduce[[scope]]
 * return 返回一个数组，将俩个函数作为元素。
 * 全局环境中通过opertor保存了这两个方法,所以cache虽然执行完毕了,上下文被销毁了,
 * 但是其AO对象依然存在于内存中,add和reduce函数依然可以通过作用域链查找到对应的变量属性值。从而对num进行操作
 * num是存在于之前的cache AO中
 */

console.log("===============");

function weekSchedule() {
    let thing = ""
    let operator = {
        setSche(value) {
            thing = value
        },
        getSche() {
            console.log("周末计划是：" + thing);
        }
    }
    return operator
}
let dosomething = weekSchedule()

dosomething.setSche("逛街")
dosomething.getSche()