let time = new Date().getTime()

setInterval(function() {
    let time2 = new Date().getTime()
    console.log(time2 - time);
    time = time2
}, 1000)