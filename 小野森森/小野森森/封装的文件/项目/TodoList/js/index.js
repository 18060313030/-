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
        oItem = document.getElementsByClassName("item"), // item列表项集合
        showInput = false, // 控制输入框外包裹容器的显示与隐藏的标记
        isEdit = false, // 判断是否是编辑状态
        currentIndex = null // 编辑的项的索引

    // 右上角+号点击事件，显示与隐藏输入框
    addEvent(showInputBtn, "click", function() {
        if (!showInput) {
            // 显示输入框
            showInputWrap()

        } else {
            for (let i = 0; i < oItem.length; i++) {
                oItem[i].className = "item"
            }
            // 隐藏输入框
            hideInputWrap()
        }
    })

    // 添加或编辑待办事件
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

        // 编辑内容
        if (isEdit) {
            let liText = getEleChilds(items[currentIndex])[0]
            liText.innerText = value
            getFather(liText, 1).className = "item"
            input.value = ""
            isEdit = false
        } else {
            // 添加内容
            // 往页面列表中添加li项目
            let oLi = document.createElement("li")
            oLi.className = "item"
            oLi.innerHTML = tmlItem(input.value)
            ulList.append(oLi)
            input.value = ""
        }
        // 隐藏输入框
        hideInputWrap()
    })

    // 删除按钮,编辑按钮,事件委托方式
    addEvent(ulList, "click", function(e) {
        e = e || window.event;
        let target = e.target || e.srcTarget, // 兼容性写法，获取触发事件的对象
            className = target.className, // 当前点中元素的类名
            oItem = document.getElementsByClassName("item"), // item列表项集合
            curLi = getFather(target, 2), // 当前编辑按钮a的上两层父级 也就是li元素节点
            targetIndex = Array.prototype.indexOf.call(oItem, curLi), // 获取当前选中的li的索引
            compareItem = oItem[currentIndex]

        // 根据类名判断对应的按钮
        if (className === "remove_btn iconfont icon-guanbi") {
            // 如果突然删除的元素就是当前编辑的元素,就隐藏input框
            if (oItem[currentIndex] === curLi) {
                hideInputWrap() // 在编辑过程中,突然删除了编辑的元素
            }
            curLi.remove() // 删除按钮上面两层父元素是li

        } else if (className === "edit_btn iconfont icon-bianji") {
            let itemLen = oItem.length

            // 点击编辑显示输入框
            showInputWrap()

            // 遍历所有的item，将样式修改为item-----背景颜色取消蓝色
            for (let i = 0; i < itemLen; i++) {
                oItem[i].className = "item"
            }
            // 当前选中项的类名加一个active 背景颜色添加蓝色
            curLi.className += " active"

            // 将当前选中的li项目的索引赋值给全局的变量
            currentIndex = targetIndex

            // 修改添加按钮的文字
            addItem.innerText = "编辑第" + (currentIndex + 1) + "项"

            // 点击了编辑按钮，修改标记isEdit为编辑
            isEdit = true
        }
    })

    // 隐藏input输入框
    function hideInputWrap() {
        inputWrap.style.display = "none" // input输入框容器隐藏
        addItem.innerHTML = "添加" // 按钮文本改成添加
        showInput = false // 显示标记为不显示
        isEdit = false // 编辑标志为非编辑状态
        input.value = "" // input输入框清空
    }

    // 显示输入框
    function showInputWrap() {
        inputWrap.style.display = "block"
        showInput = true
        input.focus()
    }

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