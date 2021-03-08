// pages/formComplete/formComplete.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: '',
    result: '',
    suggestion: '',
    solvetime: '',
    submitted: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      id: options.id
    })
    wx.lin.initValidateForm(this)
  },

  inputResult(e){
    this.setData({
      result: e.detail.value
    })
  },

  inputSuggestion(e){
    this.setData({
      suggestion: e.detail.value
    })
  },

  submit(e){
    if(this.data.result === ''){
      wx.showToast({
        title: '原因为空',
        icon: 'none'
      })
      return
    }
    if(this.data.suggestion === ''){
      wx.showToast({
        title: '建议为空',
        icon: 'none'
      })
      return
    }
    this.setData({
      submitted: true,
    })
    wx.cloud.callFunction({
      name: 'formClaim',
      data: {
        type: 'formcomplete',
        id: this.data.id,
        Record: {
          _result: this.data.result,
          _suggestion: this.data.suggestion,
        }
      },
      success: res => {
        console.log('[云函数] [formClaim] 调用成功',res.result)
        if(res.result === true){
          wx.showToast({
            title: '提交成功',
            duration: 3000
          })
          var startTime = new Date().getTime() + 3000;
          while(new Date().getTime() < startTime) {}
          wx.redirectTo({
            url: '../claimHistory/claimHistory',
          })
        } else {
          wx.showToast({
            title: '提交失败请重试',
            icon: 'error',
            duration: 3000,
          })
          this.setData({
            submitted: false,
          })
        }
      },
      fail: err => {
        console.log('[云函数] [formClaim] 调用失败')
        wx.showToast({
          title: '提交失败请重试',
          icon: 'error',
          duration: 3000,
        })
        this.setData({
          submitted: false,
        })
      }
    })
  },

  reset(e){
    this.setData({
      result: '',
      suggestion: ''
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