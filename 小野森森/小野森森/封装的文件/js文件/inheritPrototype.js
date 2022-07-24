/**
 * 继承原型的方法，使用中间构造函数来间间继承，这样修改继承的原型不会影响被继承原型对象
 */

let inherit = (function() {
    let Buffer = function() {};
    return function inherit(Target, Origin) {
        Buffer.prototype = Origin.prototype // 【中间构造函数】的原型指向【被继承构造函数（Teacher）】的原型
        Target.prototype = new Buffer() // 】【继承构造函数】原型指向【中间构造函数】构造的对象
        Target.prototype.constructor = Target // 【继承构造函数（student）】的构造器指向自己
        Target.prototype.super_class = Origin // 【继承构造函数】的继承源头（tarcher）
    }
})()