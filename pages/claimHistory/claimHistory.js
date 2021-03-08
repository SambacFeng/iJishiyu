// pages/claimHistory/claimHistory.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    Record: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.cloud.callFunction({
      name: 'query',
      data: {
        type: 'StaffQuery'
      },
      success: res => {
        // console.log('[云函数] [query] 调用成功',res.result,res.result[0]._name)
        this.setData ({
          Record: res.result
        })
      }
    })
  },

  onComplete(e){
    var formid = e.currentTarget.dataset.formid
    var url = '../formComplete/formComplete?id='+formid
    wx.redirectTo({
      url: url,
    })
  },

  toCopy(e){
    var data = e.currentTarget.dataset.data
    // console.log(data)
    wx.setClipboardData({
      data: data,
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