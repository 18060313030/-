/*
 * Student.prototype === Teacher.prototype，如果Student.prototype 上修改了,Teacher.prototype也会被修改
 * 通过中间的构造函数，来解决上述问题
 */

// Teacher构造函数 原型链上层
function Teacher(name) {
    this.name = name
}
Teacher.prototype = {
    level: "super"
}
let teacher = new Teacher()
console.log(teacher);

// Buffer构造函数 中间
function Buffer() {}
Buffer.prototype = Teacher.prototype
let buffer = new Buffer()

// Student构造函数 原型链底层
function Student(opt) {
    this.name = opt.name
}
Student.prototype = buffer
let stu = new Student({
    name: "Zs"
})

Student.prototype.age = 13

console.log(stu);