// pages/home/home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 轮播图存放
    swiperList:[],
    // 九宫格图片
    nineList:[
      {
        id:1,
        name:"美食",
        icon:"/images/tabs/contact-active.png"
      },
      {
        id:2,
        name:"洗浴足疗",
        icon:"/images/tabs/contact-active.png"
      },
      {
        id:3,
        name:"结婚啦",
        icon:"/images/tabs/contact-active.png"
      },
      {
        id:4,
        name:"卡拉ok",
        icon:"/images/tabs/contact-active.png"
      },
      {
        id:5,
        name:"找工作",
        icon:"/images/tabs/contact-active.png"
      },
      {
        id:6,
        name:"辅导班",
        icon:"/images/tabs/contact-active.png"
      },
      {
        id:7,
        name:"汽车保养",
        icon:"/images/tabs/contact-active.png"
      },
      {
        id:8,
        name:"租房",
        icon:"/images/tabs/contact-active.png"
      },
      {
        id:9,
        name:"装修",
        icon:"/images/tabs/contact-active.png"
      }
    ]
  },
  initSwiper(){
    wx.request({
      url: 'http://api-ugo-web.itheima.net/api/public/v1/home/swiperdata',
      method: "GET",
      success: (result) => {
        this.setData({
          
          swiperList: result.data.message
        })
      },
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.initSwiper()
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