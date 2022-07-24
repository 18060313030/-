class Father {
    constructor() {
        // 完全固化eat方法,this永远指向Father的实例对象,
        // 获取方法的时候会优先获取Father自身的eat方法
        // 而不是原型上的eat方法
        // 使用bind返回的才是一个函数
        this.eat = this.eat.bind(this)
    }
    get fruit() {
        return "orange"
    }

    // 原型上的
    eat() {
        console.log("喜欢吃" + this.fruit);
    }
}

class Son {
    get fruit() {
        return "apple"
    }
    eat() {
        console.log("喜欢吃" + this.fruit)
    }
}

let father = new Father()
let son = new Son()

// 可以将一个类中的方法传递给另一个类接收,从而实现son也有father的eat方法
son.eat = father.eat
son.eat()