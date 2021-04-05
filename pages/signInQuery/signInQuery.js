// pages/signInQuery/signInQuery.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    Record: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.cloud.callFunction({
      name: 'query',
      data: {
        type: 'SigninRecord',
      },
      success: res => {
        console.log('[云函数][query]调用成功',res.result)
        this.setData({
          Record: res.result
        })
      },
    })
  },

  toCheck: function (options){
    console.log(options.currentTarget.dataset.index)
    var name = this.data.Record[options.currentTarget.dataset.index]._filename
    wx.previewImage({
      urls: ['cloud://ijishiyu-6g6n5cncc846de79.696a-ijishiyu-6g6n5cncc846de79-1304847030/signin/'+name],
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