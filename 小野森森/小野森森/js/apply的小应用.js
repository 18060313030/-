function Compute() {
    this.add = function(a, b) {
        return a + b
    };
    this.reduce = function(a, b) {
        return a - b
    }
}

function FullCompute() {
    Compute.apply(this) // this指向new出来的对象，通过apply改变compute的this指向这个new出来的对象
    this.multi = function(a, b) {
        return a * b
    };
    this.div = function(a, b) {
        return a / b
    }
}

let fullCompute = new FullCompute()

console.log(compute.multi(1, 2));
console.log(compute.add(1, 2));
console.log(compute.reduce(1, 2));
console.log(compute.div(1, 2));