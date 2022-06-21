// components/test1/test1.js
import {storeBindingsBehavior} from "mobx-miniprogram-bindings"
import {store} from "../../store/store"
Component({
  behaviors: [storeBindingsBehavior],
  storeBindings: {
    store,
    fields: ["num1", "num2", "sum"],
    actions: ["addNum2"]
  },
  
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    add(e){
      this.addNum2(e.target.dataset.step)
    },
  }
})
