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
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    if(app.globalData.avatar === ''){
      var fileid = 'cloud://ijishiyu-6g6n5cncc846de79.696a-ijishiyu-6g6n5cncc846de79-1304847030/staffimg/'+app.globalData.staffInfo.name+'.jpg'
      wx.cloud.downloadFile({
        fileID: fileid,
        success: res => {
          console.log('[文件下载] 成功',res.tempFilePath)
          app.globalData.avatar = res.tempFilePath
          this.setData({
            avatar: app.globalData.avatar,
            staffname: app.globalData.staffInfo.name,
          })
        },
        fail: err => {
          console.log('[文件下载] 失败')
        }
      })
    } else {
      this.setData({
        avatar: app.globalData.avatar,
        staffname: app.globalData.staffInfo.name,
      })
    }
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