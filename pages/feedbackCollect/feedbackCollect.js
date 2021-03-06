// pages/feedbackCollect/feedbackCollect.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    submitted: false,
    name: '',
    staffname: '',
    problem: '电脑问题已全部被解决',
    problemDetail: '',
    otheridea: '',
    score: '5'
  },

  inputName(e){
    this.setData({
      name: e.detail.value
    })
  },

  inputStaffname(e){
    this.setData({
      staffname: e.detail.value
    })
  },

  getProblem(e){
    this.setData({
      problem: e.detail.key
    })
  },

  inputProblemDetail(e){
    this.setData({
      problemDetail: e.detail.value
    })
  },

  getScore(e){
    this.setData({
      score: e.detail.key
    })
  },

  inputOtheridea(e){
    this.setData({
      otheridea: e.detail.value
    })
  },

  submit(e){
    console.log(this.data)
    this.setData({
      submitted: true,
    })
    if(this.data.problemDetail !== ''){
      this.setData({
        problem: this.data.problemDetail
      })
    }
    var tmp = this.data
    delete tmp.problemDetail
    delete tmp.submitted
    wx.cloud.callFunction({
      name: 'submitform',
      data: {
        type: 'userfeedback',
        Record: tmp
      },
      success: res => {
        console.log('[云函数] [submitform] 调用成功', res.result)
        if (res.result === true){
          wx.showToast({
            title: '反馈成功',
            duration: 3000
          })
          var startTime = new Date().getTime() + 3000;
          while(new Date().getTime() < startTime) {}
          wx.navigateBack({
            delta: 1,
          })
        }
      },
      fail: err => {
        console.err
      }
    })
  },

  reset(e){
    this.setData({
      name: '',
      staffname: '',
      problem: '电脑问题已全部被解决',
      problemDetail: '',
      otheridea: '',
      score: '5'
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    wx.lin.initValidateForm(this)
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