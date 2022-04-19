  // 创建函数，提升复用性
  function move(obj, distance, callback) {
      // 优化点：如果不设置这个，那么给元素疯狂点击按钮时会不断绑定触发多个定时器，所以要先清空
      clearInterval(obj.timer)
          // 优化点：定时器名字不能写死
      obj.timer = setInterval(function() {
          // 使用缓动动画效果 公式：(目标值距离-当前值距离)/10 10可以改成其他的
          let step = (distance - obj.offsetLeft) / 10
              // 因为公式会取到小数点，所以最终位移结果不准确需要进行向上取整(步长为正值)或向下取整(步长为负值)
          step = step > 0 ? Math.ceil(step) : Math.floor(step)
          if (obj.offsetLeft === distance) {
              clearInterval(obj.timer)

              // 动画执行完毕，调用如果有回调函数则调用它
              //   if (callback) {
              //       callback()
              //   }

              callback && callback()
          } else {
              obj.style.left = obj.offsetLeft + step + "px"
          }
      }, 30)
  }