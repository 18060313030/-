function Foo(name, age) {
    // this = {} 在代码中，隐式的定义了一个this指向一个空对象
    this.name = name;
    this.age = age

    // return this  隐式的返回了this
}

let f1 = new Foo("Zs", 12) // new的时候就是把指向window的this，指向了对象
console.log(f1.name, f1.age);

console.log("=============");
// 上面的代码等同于下面的

function Foo2(name, age) {
    let my = {};
    my.name = name;
    my.age = age;
    return my
}
let f2 = Foo2("Ls", 13)
console.log(f2.name, f2.age);

console.log("=============");
// 照着上面的说法，隐式的return this ,那么我们手动修改return的值
function Foo3(name, age) {
    this.name = name;
    this.age = age;
    // return 123 // 基本数据类型不起作用
    return {} // 引用数据类型起作用了
}
let f3 = new Foo3("Ww", 14)
console.log(f3); // {} 。如果return []结果是数组 return 函数 结果就是函数