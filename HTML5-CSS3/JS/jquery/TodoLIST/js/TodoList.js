$(function() {
    // 加载页面时先获取并渲染数据
    load()

    // 1、按下回车键
    $("#title").on("keydown", function(e) {
        if (e.keyCode === 13) {
            if (!$(this).val().trim()) {
                alert("请输入任务")
                $(this).val("")
            } else {
                // 1、获取本地存储中的数据
                let localData = getData()
                console.log(localData);

                // 2、将文本框信息添加到数组中，再添加到本地存储里
                localData.push({ title: $(this).val(), done: false })
                setData(localData)

                // 3、从localStorage获取数据，渲染到页面中
                load()

                $(this).val("")
            }
        }
    })

    // 2、删除单个数据
    $("ul,ol").on("click", "a", function() {
        // 1、获取数据
        let localData = getData()

        // 2、删除数据
        let index = $(this).attr("index") // a元素在动态创建时，添加了自定义属性index，所以每一个a都有自己对应的索引号，根据这个索引来精确的删除数据
        localData.splice(index, 1)

        // 3、存储数据
        setData(localData)

        // 4、渲染页面
        load()
    })

    // 3、复选框状态改变
    $("ol, ul").on("click", "input", function() {
        // 1、获取数据
        let localData = getData()

        // 2、修改数据
        let index = $(this).siblings("a").attr("index") // input和a有着同一个父级li，所以a的index就是input的index
        console.log(index);
        localData[index].done = $(this).prop("checked")
        console.log($(this).prop("checked"));

        // 3、存储数据
        setData(localData)

        // 4、渲染页面
        load()
    })

    // 4、点击修改按钮
    $("ul,ol").on("click", "button", function() {

        let index = $(this).siblings("a").attr("index")
        console.log($("label"));
        $($("label")[index]).css("display", "none")
    })

    // 获取本地存储的数据
    function getData() {
        let localData = localStorage.getItem("task") // 获取localStorage存储的task数据
        if (localData !== null) {
            return JSON.parse(localData) // localStorage中只能存储字符串，需要将值转换成数组对象
        } else {
            return []
        }
    }

    // 存储数据
    function setData(data) {
        localStorage.setItem("task", JSON.stringify(data))
    }

    // 追加、渲染数据
    function load() {
        let doneCount = 0
        let count = 0
        let localData = getData() // 获取存储数据
        $("ul, ol").empty() // 因为页面加载一次的时候也会调用load函数，为防止按一次回车，页面出现两条相同的数据
        $.each(localData, function(i, item) { // 遍历数组
            if (item.done) {
                console.log(item.done);
                let li = $('<li><input type="checkbox" class="checkbox" checked=' + item.done + '><label >' + item.title + '</label><input type="text" class="text"><button>修改</button><a href="" index="' + i + '">删除</a></li>')
                $("ol").prepend(li)
                doneCount++
            } else {
                let li = $('<li><input  type="checkbox" class="checkbox"><label >' + item.title + '</label><input type="text" class="text"><button>修改</button><a href="" index="' + i + '">删除</a></li>')
                $("ul").prepend(li)
                count++
            }
        })
        $(".body_done i").text(doneCount)
        $(".body_todo i").text(count)

    }

})