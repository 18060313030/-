function myNew(context) {
    const obj = new Object
    obj.__proto__ = context.prototype
    let res = context.apply(obj, [...arguments].slice(1))
    return typeof res === "object" ? res : obj
}

function Foo(name, age) {
    this.name = name
    this.age = age
    let fn = function() {
        console.log(this.name);
    }
}
let s = myNew(Foo, "zs", 12)
console.log(myNew(Foo, "zs", 12));
s.fn()