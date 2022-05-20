// pages/goodsList/goodsList.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    query:{}, // 存储分类商品列表页面标题
    goodsList: [], // 商品信息列表
    page: 1, // 请求显示的页数
    pageSize: 10, // 每页的数量
    total: 0, // 商品总数
    flag: false // 节流阀,false表示没有在加载
  },

  // 获取商品列表信息的函数
  getGoodsList(cb){
    // 开始请求数据时节流阀都给关闭了
    this.setData({
      flag: true
    })
    wx.showLoading({
      title: '加载中...',
    })
    wx.request({
      url: `https://www.escook.cn/categories/${this.data.query.id}/shops`,
      method:"GET",
      data:{
        _page: this.data.page,
        _limit: this.data.pageSize
      },
      success: (res)=>{
        console.log(res);
        this.setData({
          goodsList: [...this.data.goodsList, ...res.data],
          total: res.header["X-Total-Count"] - 0
        })
      },
      complete:()=>{
        wx.hideLoading()
        // 请求完成才给解开节流阀
        this.setData({
          flag: false
        })
        cb && cb() // 该方法如果有传入回调参数，就使用该回调参数，用来取消下拉效果的。
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 获取传递过来的参数（url链接后面跟着的参数）
    this.setData({
      query: options
    })
    this.getGoodsList()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    // 动态设置页面标题
    wx.setNavigationBarTitle({
      title: this.data.query.title,
    })
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
    // 重置商品列表页信息
    this.setData({
      page: 1,
      goodsList: [],
      total: 0
    })
    this.getGoodsList(() => {
      wx.stopPullDownRefresh()
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    // 如果 页数 * 每页商品数 >= 商品总数
    if(this.data.pageSize * this.data.page >= this.data.total){
      return wx.showToast({
        title: '已经到底了~',
        icon: "none"
      })
    }
    if(!this.data.flag){
      this.setData({
        page: this.data.page + 1
      })
      this.getGoodsList()
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})