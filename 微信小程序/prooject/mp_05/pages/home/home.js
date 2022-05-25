// pages/home/home.js
import {createStoreBindings} from "mobx-miniprogram-bindings"
import {store} from "../../store/store"
Page({
  /**
   * 页面的初始数据
   */
  data: {

  },
  async getInfo(){
    let { data: res} = await wx.p.request({
      method: "get",
      url: "http://api-ugo-web.itheima.net/api/public/v1/home/swiperdata",
    })
    console.log(res);
  },
  btn(e){
    this.addNum1(e.target.dataset.step)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.storeBindings = createStoreBindings(this, {
      store,
      fields: ["num1", "num2", "sum"],
      actions: ["addNum1", "addNum2"]
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    this.storeBindings.destoryStoreBindings()
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})