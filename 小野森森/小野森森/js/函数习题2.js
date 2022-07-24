// 写一个构造函数，可以设置车的牌子，颜色，价格
// 写一个构造消费者的函数，年龄，性别，收入，通过选择的方法实例化该用户喜欢的车，再设置车的属性
// function Car(opt) {
//     this.brand = opt.brand;
//     this.price = opt.price;
//     this.displacement = opt.displacement;
// }

// function Person(opt) {
//     this.name = opt.name;
//     this.age = opt.age;
//     this.income = opt.income;
//     this.selectCar = function() {
//         let car = new Car(opt.car)
//         console.log(`${this.name}买了一辆排量为${car.displacement}的${car.brand}轿车`)
//     }
// }
// let p = new Person({
//     name: "zs",
//     age: 12,
//     income: 10000,
//     car: {
//         displacement: "1T",
//         brand: "雪佛兰",
//         price: "$120000"
//     }
// })
// p.selectCar()

function Car(brand, price) {
    this.brand = brand
    this.price = price
}

function Person(opt) {
    this.name = opt.name
    this.income = opt.income
    this.buyCar = function() {
        Car.apply(this, ["宝马", "30w"])
        console.log(`${this.name} 年收入 ${this.income} 买了 一辆 ${this.price}的${this.brand}`)
    }
}
let p = new Person({
    name: "Zs",
    income: "20w"
})
p.buyCar()