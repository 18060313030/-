function animate(obj, target, callback) {
    clearInterval(obj.timer)
    obj.timer = setInterval(function() {
        let move = (target - obj.offsetLeft) / 10
        move = move > 0 ? Math.ceil(move) : Math.floor(move)
        if (obj.offsetLeft === target) {
            clearInterval(obj.timer)
            callback && callback()
        }
        obj.style.left += step + "px"
    }, 15)
}