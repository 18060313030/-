// let data = {
//     name: "张三",
//     age: 12
// }

// 拼接出查询字符串
function resolveData(data) {
    let arr = []
    for (let key in data) {
        arr.push(key + "=" + data[key])
    }
    return arr.join("&")
}
// console.log(resolveData(data));

// 发送请求的封装函数
function myAjax(obj) {
    let xhr = new XMLHttpRequest() // 创建xhr对象
    let params = resolveData(obj.data) // 查询字符串

    // 判断请求类型
    if (obj.method.toUpperCase() === "GET") {
        xhr.open(obj.method, obj.url + "?" + params)
        xhr.send()
    } else if (obj.method.toUpperCase() === "POST") {
        xhr.open(obj.method, obj.url)
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded")
        xhr.send(params)
    }

    // 监听onreadystatechange事件
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            console.log(JSON.parse(xhr.responseText));
        }
    }
}