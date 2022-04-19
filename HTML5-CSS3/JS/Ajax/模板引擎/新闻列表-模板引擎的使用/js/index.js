$(function() {
    let arr = []

    function getData() {
        $.ajax({
            method: "GET",
            url: "http://www.liulongbin.top:3006/api/news",
            success(res) {
                console.log(res);
                if (res.status !== 200) return alert("获取新闻列表失败")
                arr = res.data
                console.log(arr[0]);
                for (let i = 0; i < arr.length; i++) {
                    arr[i].tags = arr[i].tags.split(",")
                    let div = template("template", arr[i])
                    $(".box").append(div)
                }
            }
        })
    }
    template.defaults.imports.timeFormat = function(time) {
        let dateTime = new Date(time)
        let Year = dateTime.getFullYear()
        let MM = addZero(dateTime.getMonth() + 1)
        let DD = addZero(dateTime.getDay())
        let hh = addZero(dateTime.getHours())
        let mm = addZero(dateTime.getMinutes())
        let ss = addZero(dateTime.getSeconds())

        return `${Year}-${MM}-${DD} ${hh}:${mm}:${ss}`

    }

    function addZero(value) {
        return value <= 9 ? "0" + value : value
    }
    getData()
})