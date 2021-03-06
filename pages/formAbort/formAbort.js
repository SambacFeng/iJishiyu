// pages/formAbort/formAbort.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: '',
    submitted: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      id: options.id,
    })
  },

  toStop: function (){
    wx.showModal({
      cancelColor: 'cancelColor',
      content: '确认终止？',
      success: res => {
        if(res.confirm){
          this.setData({
            submitted: true,
          })
          wx.cloud.callFunction({
            name: 'submitform',
            data: {
              type: 'formstop',
              id: this.data.id,
            },
            success: res => {
              console.log('[云函数] [submitform] 调用成功', res.result)
              if (res.result === true){
                wx.showToast({
                  title: '终止成功',
                })
                wx.redirectTo({
                  url: '../formHistory/formHistory',
                })
              } else {
                wx.showToast({
                  title: '终止失败',
                  icon: 'none',
                  duration: 3000
                })
                this.setData({
                  submitted: false,
                })
              }
            }
          })
        }
      }
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