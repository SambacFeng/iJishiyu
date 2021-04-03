// pages/staffSignIn/staffSignIn.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    flag: false,
    tmpsrc: '',
    staffsheet: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.cloud.callFunction({
      name: 'query',
      data: {
        type: 'Worksheet',
      },
      success: res => {
        console.log('[云函数][query]调用成功',res.result)
        this.setData({
          staffsheet: res.result._staffname
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  toChange(res){
    this.setData({
      tmpsrc: res.detail.all[0].url,
    })
  },
  toCamera(){
    if(this.data.tmpsrc === '') return
    this.setData({
      flag: true,
    })
    var date = new Date()
    var years = date.getFullYear().toString()
    var months = (date.getMonth()+1).toString()
    if (months.length < 2) months = '0'+months
    var days = date.getDate().toString()
    if (days.length < 2) days = '0'+days
    var hours = date.getHours().toString()
    if (hours.length < 2) hours = '0'+hours
    var minutes = date.getMinutes().toString()
    if (minutes.length < 2) minutes = '0'+minutes
    var time = years+'-'+months+'-'+days+'-'+hours+':'+minutes
    var name=time+app.globalData.staffInfo.name+'.jpg'
    
    wx.cloud.uploadFile({
      cloudPath: 'signin/'+name,
      filePath: this.data.tmpsrc,
      success: res=> {
        console.log('图片上传成功')
        wx.showToast({
          title: '上传成功',
          icon: 'success',
          duration: 3000,
        })
        this.setData({
          flag: false,
          tmpsrc: '',
        })
      },
      fail: err => {
        console.error('上传失败',err)
        wx.showToast({
          title: '上传失败',
          icon: 'none',
          duration: 3000,
        })
        this.setData({
          flag: false,
          tmpsrc: ''
        })
      }
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