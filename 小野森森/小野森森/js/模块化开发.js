/*
 * 模块发开发流程
 * 使用立即执行函数 创造一个独立的空间，让其自启动
 * 定义一个变量接收内部返回的值(也可以直接使用window.的方式返回一个全局变量)
 * 直接return 需要返回的值，不要赋值后，再返回接收赋值的变量
 */

// 继承原型的方法
let inherit = (function() {
    let Buffer = function() {};
    return function inherit(Target, Origin) {
        Buffer.prototype = Origin.prototype // 【中间构造函数】的原型指向【被继承构造函数（Teacher）】的原型
        Target.prototype = new Buffer() // 】【继承构造函数】原型指向【中间构造函数】构造的对象
        Target.prototype.constructor = Target // 【继承构造函数（student）】的构造器指向自己
        Target.prototype.super_class = Origin // 【继承构造函数】的继承源头（tarcher）
    }
})()

;
let initProgramer = (function() {
    // 创建一个被继承的构造函数
    let Programer = function() {};
    // 给构造函数添加属性和方法
    Programer.prototype = {
        occupation: "程序员",
        work: "写代码",
        time: "12小时",
        description: function() {
            console.log(`我叫${this.name},是一名${this.position},每天花${this.time}${this.work}`);
        }
    }

    // 定义两个继承构造函数
    let FrontCoder = function() {}
    let AfterCoder = function() {}

    // 两个继承构造函数 被继承的构造函数原型(通过中间构造函数原型赋值方式来继承)
    inherit(FrontCoder, Programer)
    inherit(AfterCoder, Programer)

    // 两个继承构造函数自定义自己的原型上的属性
    FrontCoder.prototype.name = "法外狂徒张三"
    FrontCoder.prototype.position = "前端搬砖员"
    AfterCoder.prototype.name = "开膛手杰克"
    AfterCoder.prototype.position = "后端搬砖员"

    // 返回这两个构造函数
    return {
        FrontCoder,
        AfterCoder
    }
})()

// 外部接收调用
let zs = new initProgramer.FrontCoder()
let jok = new initProgramer.AfterCoder()
zs.description()
jok.description()