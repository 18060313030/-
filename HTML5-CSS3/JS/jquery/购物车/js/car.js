$(function() {
    // 点击购物车的全选按钮，将checked状态赋值给单个商品的复选框---------
    $(".checkall").change(function() {
        $(".j-checkbox, .checkall").prop("checked", $(this).prop("checked")) // $(this)不能改成$(".checkall")
        getCountMoney()

        // 勾选的商品添加背景色
        if ($(this).prop("checked")) {
            $(".cart-item").addClass("check-cart-item")
        } else {
            $(".cart-item").removeClass("check-cart-item")
        }
    })

    // 点击单个复选框，如果全部被点击，全选框就被勾选----------
    $(".j-checkbox").change(function() {
        console.log("被勾选的复选框状态:", $(".j-checkbox:checked"));
        // if(被选中的小复选框个数等于所有的小复选框个数){ 全选框被选中 } else { 全选框未被选中 }
        if ($(".j-checkbox:checked").length == $(".j-checkbox").length) {
            $(".checkall").prop("checked", true)
        } else {
            $(".checkall").prop("checked", false)
        }

        // 勾选的商品添加背景色
        if ($(this).prop("checked")) {
            $(this).parents(".cart-item").addClass("check-cart-item")
        } else {
            $(this).parents(".cart-item").removeClass("check-cart-item")
        }
        getCountMoney()
    })

    // 点击加号------------
    $(".increment").click(function() {
        // 1、增加商品数量
        let n = $(this).siblings(".itxt").val() // 获取当前点击的加号的兄弟元素 input框的值
        n++ // 对值加1
        $(this).siblings(".itxt").val(n) // 将值赋值给当前点击的加号的兄弟元素 input框

        // 2、计算商品总价
        let price = $(this).parents(".p-num").siblings(".p-price").text() // 获取商品的单价信息
        price = price.substr(1) // 将￥之后的价格截取出来
        $(this).parents(".p-num").siblings(".p-sum").text("￥" + (price * n).toFixed(2)) // 将单价乘以总数 赋值给小计元素，toFixed(2)保留两位小数，类型变为字符串
        getCountMoney()
    })

    // 点击减号------------
    $(".decrement").click(function() {
        // 1、减少商品数量
        let n = $(this).siblings(".itxt").val() // 获取当前点击的减号的兄弟元素 input框的值
        if (n > 1) {
            n-- // 对值减1
        }
        $(this).siblings(".itxt").val(n) // 将值赋值给当前点击的减号的兄弟元素 input框

        // 2、计算商品总价
        let price = $(this).parents(".p-num").siblings(".p-price").text() // 获取商品的单价信息
        price = price.substr(1) // 将￥之后的价格截取出来
        $(this).parents(".p-num").siblings(".p-sum").text("￥" + (price * n).toFixed(2)) // 将单价乘以总数 赋值给小计元素，toFixed(2)保留两位小数，类型变为字符串
        getCountMoney()
    })

    // 修改输入框的数量,计算小计的价格-----------
    $(".itxt").change(function() {
        let n = $(this).val() // 获取当前输入框的数量
        let price = $(this).parents(".p-num").siblings(".p-price").text() // 获取当前商品的单价
        price = price.substr(1) // 将￥之后的价格截取出来
        $(this).parents(".p-num").siblings(".p-sum").text("￥" + (price * n).toFixed(2))
        getCountMoney()
    })

    // 计算总数和总额---------
    getCountMoney()

    function getCountMoney() {
        let count = 0 // 商品总数
        let money = 0 // 商品总价
        for (let i = 0; i < $(".j-checkbox:checked").length; i++) { // 遍历所有被选中的商品
            count += parseInt($($(".j-checkbox:checked")[i]).parent().siblings(".p-num").find(".itxt").val()) // 获取被选中商品的数量
            money += parseFloat($($(".j-checkbox:checked")[i]).parent().siblings(".p-sum").text().substr(1)) // 获取被选中商品的小计

        }
        if ($(".j-checkbox:checked").length == 0) { // 当没有商品被选中时，归0
            count = 0
            money = 0
        }
        $(".amount-sum").children("em").text(count) // 将数量添加到对应位置
        $(".price-sum").children("em").text("￥" + money.toFixed(2)) // 将总价格添加到对应位置

        // $(".itxt").each(function(index, domEle) {
        //     count += parseInt($(domEle).val()) // 累加获取文本框的数量
        // })
        // $(".amount-sum").children("em").text(count) // 将数量添加到对应位置
        // $(".p-sum").each(function(index, domEle) {
        //     money += parseFloat($(domEle).text().substr(1)) // 累加小计的价格
        // })
        // $(".price-sum").children("em").text("￥" + money.toFixed(2)) // 将总价格添加到对应位置
    }

    // 删除商品模块----------
    // 点击商品后面的删除按钮
    $(".p-action").click(function() {
        $(this).parents(".cart-item").remove()
        getCountMoney()
    })

    // 删除选中的商品 
    $(".remove-batch").click(function() {
        $(".j-checkbox:checked").parents(".cart-item").remove()
        getCountMoney()
    })

    // 删除所有商品
    $(".clear-all").click(function() {
        $(".cart-item").remove()
        getCountMoney()
    })
})