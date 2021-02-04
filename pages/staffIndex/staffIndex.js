// pages/staffIndex/staffIndex.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    avatar: '/assets/logo.jpg',
    staffname: '及时雨志愿者服务队',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var fileid = 'cloud://jishiyutest-0gwe9qrfa9d62009.6a69-jishiyutest-0gwe9qrfa9d62009-1304847030/staffimg/'+app.globalData.staffInfo.name+'.png'
    wx.cloud.downloadFile({
      fileID: fileid,
      success: res => {
        console.log('[文件下载] 成功',res.tempFilePath)
        this.setData({
          avatar: res.tempFilePath,
          staffname: app.globalData.staffInfo.name,
        })
      },
      fail: console.err
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