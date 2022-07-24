init()

function init() {
    initTodoList
}
// 使用let会报错，因为没有变量提升的步骤，需要改成var
var initTodoList = (function() {
    let showInputBtn = document.getElementsByClassName("j_show_input")[0], // 右上角的+号
        inputWrap = document.getElementsByClassName("input_wrap")[0], // input输入框外包裹的容器
        addItem = document.getElementsByClassName("j-addItem")[0], // 添加项目的按钮
        input = document.getElementsByClassName("j-ipt")[0], // input输入框
        ulList = document.getElementsByClassName("list")[0], // ul列表
        showInput = false // 控制输入框外包裹容器的显示与隐藏的标记

    // 右上角+号点击事件，显示与隐藏输入框
    addEvent(showInputBtn, "click", function() {
        if (!showInput) {
            // 显示输入框
            inputWrap.style.display = "block"
            showInput = true
        } else {
            // 隐藏输入框
            inputWrap.style.display = "none"
            showInput = false
        }
    })

    // 添加待办事件
    addEvent(addItem, "click", function() {
        let value = input.value, // 添加的内容
            valueLength = value.length, // 添加的内容长度
            items = document.getElementsByClassName("item"), // 列表项目集合
            itemsLength = items.length // 列表项目集合长度

        // 文本长度为0 标记一下，后续使用正则来修改判断条件
        if (valueLength === 0) {
            return
        }

        // 判断输入的todo是否已经存在
        // 获取items元素节点列表，然后遍历出他们的text文本，进行text文本的一一对比
        for (let i = 0; i < itemsLength; i++) {
            let itemText = getEleChilds(items[i])[0].innerText
            if (value === itemText) {
                alert("已存在该任务")
                return
            }
        }

        // 往页面列表中添加li项目
        let oLi = document.createElement("li")
        oLi.className = "item"
        oLi.innerHTML = tmlItem(input.value)
        ulList.append(oLi)
        input.value = ""

        // 添加完毕，隐藏input
        inputWrap.style.display = "none"
        showInput = false
    })

    // 删除按钮,事件委托
    addEvent(ulList, "click", function(e) {
        // 兼容性写法，获取触发事件的对象
        e = e || window.event;
        let target = e.target || e.srcTarget,
            className = target.className

        // 根据类名判断对应的按钮
        if (className === "remove_btn iconfont icon-guanbi") {
            getFather(target, 2).remove() // 删除按钮上面两层父元素是li
        } else if (className === "edit_btn iconfont icon-bianji") {

        }
    })

    // item模板
    function tmlItem(text) {
        return (
            "<p class='item_content' >" + text + "</p>" +
            "<div class='btn_group'>" +
            "<a href='javascript:;' class='edit_btn iconfont icon-bianji'><a>" +
            "<a href='javascript:;' class='remove_btn iconfont icon-guanbi'><a>" +
            "</div>"
        )
    }
})()