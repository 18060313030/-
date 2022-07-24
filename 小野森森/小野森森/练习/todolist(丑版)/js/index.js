function init() {
    initTodoList
};
let initTodoList = (function() {
    let oBtn = document.getElementsByClassName("j_btn")[0],
        oUl = document.getElementsByClassName("item_list")[0],
        oIpt = document.getElementsByClassName("j_ipt")[0]


    //添加li
    addEvent(oBtn, "click", function() {
        let value = oIpt.value
        if (value.length <= 0) {
            return
        }

        let oLi = document.createElement("li")
        oLi.className = "item"
        oLi.innerHTML = temp(value)
        oUl.appendChild(oLi)
        oIpt.value = ""
    })

    // 删除item
    addEvent(oUl, "click", function(e) {
        var e = e || window.e,
            tar = e.target || e.srcElement
        console.log(tar);
        if (tar.className === "del_btn") {
            getFather(tar, 2).remove()
        }
    })

    // 模板
    function temp(value) {
        return (
            '<p>' + value + '</p>' +
            '<div class="btn_group">' +
            '<a href="javascript:;" class="edit_btn">编辑</a>' +
            '<a href="javascript:;" class="del_btn">删除</a>' +
            '</div>'
        )
    }
})()

init()