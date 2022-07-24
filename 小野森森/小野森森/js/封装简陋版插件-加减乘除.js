// 封装简陋版插件 加减乘除
;
(function() {
    var Compute = function(opt) {
        this.firstNum = opt.firstNum
        this.secondNum = opt.secondNum
    }
    Compute.prototype = {
        add: function() {
            return this.firstNum + this.secondNum
        },
        reduce: function() {
            return this.firstNum - this.secondNum
        },
        mul: function() {
            return this.firstNum * this.secondNum
        },
        except: function() {
            return this.firstNum / this.secondNum
        }
    }
    window.Compute = Compute
})();
let compute = new Compute({
    firstNum: 12,
    secondNum: 1
})
console.log(compute.add());