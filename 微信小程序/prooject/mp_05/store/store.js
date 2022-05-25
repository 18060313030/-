import {observable, action}  from "mobx-miniprogram"

export const store = observable({
  // 数据
  num1: 1,
  num2: 2,
  index: 0,
  // 计算属性
  get sum(){
    return this.num1 + this.num2
  },
  // 方法
  changeIndex: action(function(value){
    this.index = value
  }),
  addNum1: action(function(step){
    this.num1 += step
  }),
  addNum2:  action(function(step){
    this.num2 += step
  })
  
})