function dateFormat(time){
    const date = new Date(time)
    //获取时间
    let y = date.getFullYear()
    let mm = padZero(date.getMonth()+1)
    let d = padZero(date.getDay())
    let h = padZero(date.getHours())
    let m = padZero(date.getMinutes())
    let s = padZero(date.getSeconds())
    return `${y}-${mm}-${d} ${h}:${m}:${s}`

}
// 时间补零
function padZero(n){
    return n > 9? n : "0" + n;
}


export {
    dateFormat
}