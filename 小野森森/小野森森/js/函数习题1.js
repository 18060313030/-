// 每次调用函数，数字都会加1
function cache(num = 0) {
    function add() {
        console.log(++num)
    }
    return add
}
let add = cache(3)
add()
add()
add()

console.log("============");

// 操作名单的删除与添加
function studentRoster() {
    let arr = ["小明", "小红"]
    let operation = {
        enter(name) {
            arr.push(name)
            console.log(`已添加学员${name},目前名单上有学员：${arr.join(",")}`);
        },
        leave(name) {
            if (arr.indexOf(name) !== -1) {
                arr.splice(arr.indexOf(name), 1)
                console.log(`已删除学员${name},目前名单上有学员：${arr.join(",")}`);
            } else {
                console.log("无法删除该学员，该学员不存在")
            }
        }
    }
    return operation
}
let stuOpera = studentRoster()
stuOpera.enter("张三")
stuOpera.enter("李四")
stuOpera.leave("李四")
stuOpera.leave("小绿")
stuOpera.leave("小绿")