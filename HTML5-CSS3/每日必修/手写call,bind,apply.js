let obj = {
    value: "ok"
}

function Foo(name, age) {
    console.log(name, age);
    console.log(this.value);
}

Foo.prototype.test = "test"

// 手写bind
Function.prototype.bind = function(context) {
    if (typeof this !== "function") {
        throw new Error("type error")
    }
    let self = this
    let args = [...arguments].slice(1)
    let newObj = function() {
        let args2 = [...arguments]
        if (this instanceof newObj) {
            self.apply(this, args.concat(args2))
        } else {
            self.apply(context, args.concat(args2))
        }
    }
    return newObj
}

// foo.call(obj, ["张三", 12])
// foo.apply(obj, ["zs"], 12)
let p = Foo.bind(obj, "Zs")
let p2 = new p(12)