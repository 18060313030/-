// custom-tab-bar/index.js
import { storeBindingsBehavior } from "mobx-miniprogram-bindings"
import { store } from "../store/store"
Component({
  // 获取mobx共享数据中的sum值
  behaviors: [storeBindingsBehavior],
  storeBindings: {
    store,
    fields:["sum","index"],
    actions: ["changeIndex"]
  },
  // 监听num数值的变化，将变化后的数字赋值给info
  observers: {
    "sum": function(val) {
      this.setData({
        "itemList[1].info" : val
      })
    }
  },
  options: {
    styleIsolation: "shared"
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
    itemList: [
      {
        "pagePath": "/pages/home/home",
        "text": "首页",
        "iconPath": "/images/tabs/home.png",
        "selectedIconPath": "/images/tabs/home-active.png"
      },
      {
        "pagePath": "/pages/message/message",
        "text": "消息",
        "iconPath": "/images/tabs/message.png",
        "selectedIconPath": "/images/tabs/message-active.png",
        "info": 0
      },
      {
        "pagePath": "/pages/contact/contact",
        "text": "联系我们",
        "iconPath": "/images/tabs/contact.png",
        "selectedIconPath": "/images/tabs/contact-active.png"
      }
    ]
  },
  

  /**
   * 组件的方法列表
   */
  methods: {
    onChange(event) {
      // event.detail 的值为当前选中项的索引
      this.setData({ active: event.detail });
      this.changeIndex(event.detail)
      // 通过索引获取到对应itemList里面的pagePath 来进行编程式导航
      wx.switchTab({
        url: this.data.itemList[event.detail].pagePath,
      })
    },
  }
})
