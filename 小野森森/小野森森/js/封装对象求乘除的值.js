// function Computed() {
//     // 加
//     this.add = function() {
//         let res = 0
//         return tools(arguments, "add", res)
//     }

//     // 乘
//     this.mul = function() {
//         let res = 1
//         return tools(arguments, "mul", res)
//     }

//     // 工具函数，求根据传入的参数，求不同的值
//     function tools(args, methods, res) {
//         for (let i = 0; i < args.length; i++) {
//             let item = args[i]
//             if (methods === "add") {
//                 res += item
//             } else if (methods === "mul") {
//                 res *= item
//             }
//         }
//         return res
//     }
// }

let Compute = (function() {
    function Compute(opt) {

    }
    Compute.prototype = {
        add: function() {
            return tools("add", arguments)
        },
        reduce() {
            return tools("reduce", arguments)
        },
        mul() {
            return tools("mul", arguments)
        },
        div() {
            return tools("div", arguments)
        }
    }

    function tools(method, args) {
        let total = args[0]
        for (let i = 1; i < args.length; i++) {
            if (method === "add") {
                total += args[i]
            } else if (method === "reduce") {
                total -= args[i]
            } else if (method === "mul") {
                total *= args[i]
            } else if (method === "div") {
                totals /= args[i]
            } else {
                console.log("参数有误");
            }
        }
        return total
    }
    return Compute
})()
let com = new Compute()
console.log(com.add(1, 2, 3));
console.log(com.mul(1, 2, 3, 4));