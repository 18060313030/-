// new Date().getDay() 获取星期数 返回值为 0 - 6
// 在原型上封装一个weekDay修改一下
let data = new Date()

Date.prototype.getWeekDay = function(lang) {
    let week = this.getDay()
    switch (week) {
        case 0:
            return lang === "cn" ? "星期天" : "Sunday";
            break
        case 1:
            return lang === "cn" ? "星期六" : "Saturday";
            break
        case 2:
            return lang === "cn" ? "星期五" : "Friday";
            break
        case 3:
            return lang === "cn" ? "星期四" : "Thursday";
            break
        case 4:
            return lang === "cn" ? "星期三" : "Wednesday";
            break
        case 5:
            return lang === "cn" ? "星期二" : "Tuesday";
            break
        case 6:
            return lang === "cn" ? "星期一" : "Monday";
            break
    }
}
console.log(data.getWeekDay());