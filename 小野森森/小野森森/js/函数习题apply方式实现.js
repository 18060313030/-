/*
 * 使用apply实现
 * 写一个构造函数，可以设置车的牌子，颜色，价格
 * 写一个构造消费者的函数，年龄，性别，收入，通过选择的方法实例化该用户喜欢的车，再设置车的属性
 */

function Car(brand, price, color) {
    this.brand = brand;
    this.price = price;
    this.color = color;
    this.info = function() {
        return `牌子：${this.brand},价格：${this.price},color: ${this.color}`;
    }
}

function Person(opt) {
    Car.apply(this, [opt.brand, opt.price, opt.color])
    this.name = opt.name;
    this.occupation = opt.occupation;
    this.work = opt.work;
    this.buyCar = function() {
        console.log(`干着${this.work}的${this.name}，买了一辆${this.info()} 的车`);
    }
}
let p = new Person({
    name: "jok",
    occupation: "杀人狂魔",
    work: "外科手术",
    brand: "科莱威",
    price: "120000",
    color: "红色"
})
p.buyCar()