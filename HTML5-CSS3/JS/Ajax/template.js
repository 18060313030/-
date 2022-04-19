function template(id, data) {
    // 通过模板的id获取模板信息
    let str = document.getElementById(id).innerHTML

    // 正则表达式
    let pattern = /{{\s*([a-zA-Z]+)\s*}}/

    // 设置一个对象接收正则表达式匹配的结果
    let result = null

    // 如果pattern.exec(str)的结果为null，就终止循环
    while (result = pattern.exec(str)) {
        console.log(result);
        str = str.replace(result[0], data[result[1]]) // 替换模板里面的{{  }}占位符的值 为 数据data的值
    }

    return str
}