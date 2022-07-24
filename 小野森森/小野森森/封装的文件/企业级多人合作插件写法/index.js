;
(function() {
    function Compute(opt) {
        this.num1 = opt.num1;
        this.num2 = opt.num2;
        this.btns = opt.btns;
    }
    Compute.prototype = {
        init() {
            this.bindEvent()
        },
        bindEvent() {
            let _self = this;
            addEvent(this.btns, "click", function(e) {
                _self.compute.call(_self, e);
            });
        },
        compute(e) {
            var e = e || window.e,
                tar = e.target || e.srcElement,
                n1 = Number(this.num1.value),
                n2 = Number(this.num2.value),
                data;
            data = tar.dataset.calcu
            switch (data) {
                case "add":
                    console.log(n2 + n1);
                    break
                case "minus":
                    console.log(n1 - n2);
                    break
                case "multi":
                    console.log(n1 * n2);
                    break
                case "div":
                    console.log(n1 / n2);
                    break
                default:
                    console.log("错误");
            }
        }
    }
    window.Compute = Compute
})()