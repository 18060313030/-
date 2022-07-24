// 获取对应的星期数
function getWeek(day) {
    let weekArr = [
        "一", "二", "三", "四", "五", "六", "七"
    ]
    return weekArr[day - 1] !== undefined ? weekArr[day - 1] : "没有这个星期数"
}
console.log(getWeek(4));

// 不使用day-1 来获取对应的星期数
// 在数组第一项 加一个逗号,那么第一项就是empty了
function getWeek(day) {
    let weekArr = [, "一", "二", "三", "四", "五", "六", "七"]
    return weekArr[day] !== undefined ? weekArr[day] : "没有这个星期数"
}
console.log(getWeek(3));







// 麻烦的写法
function getWeekTrouble(day) {
    switch (day) {
        case 1:
            return "一"
        case 2:
            return "二"
        default:
            return "没有这种星期数"
    }
}
console.log(getWeekTrouble(2));