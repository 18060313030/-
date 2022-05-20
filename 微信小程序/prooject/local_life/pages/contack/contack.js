// pages/contack/contack.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    count: 0,
    username: "zs",
    name: "GG"
  },
  goMessage(){
    wx.switchTab({
      url: "/pages/message/message",
    })
  },
  goInfo(){
    wx.navigateTo({
      url: "/pages/info/info",
    })
  },
  gotoParameter(){
    wx.navigateTo({
      url: '/pages/info/info?name=ls&age=28',
    })
  },
  add(){
    this.setData({
      count: this.data.count + 1
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
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

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.setData({
      count: 0
    })
    wx.stopPullDownRefresh()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    console.log("触发了");
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})