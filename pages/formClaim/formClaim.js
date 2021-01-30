// pages/formClaim/formClaim.js
const app = getApp()
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
        type: 'formClaim'
      },
      success: res => {
        console.log('[云函数] [query] 调用成功', res.result)
        this.setData({
          Record: res.result
        })
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

  },
  toClaim: function(e) {
    var date = new Date()
    var time = date.getFullYear().toString()+'-'+(date.getMonth()+1).toString()+'-'+date.getDate().toString()+' '+date.getHours().toString()+':'+date.getMinutes().toString()
    wx.cloud.callFunction({
      name: 'formClaim',
      data: {
        id: e.currentTarget.dataset.formid,
        staffname: app.globalData.staffInfo.name,
        staffQQ: app.globalData.staffInfo.QQ,
        staffphone: app.globalData.staffInfo.phone,
        claimtime: time
      },
      success: res => {
        console.log('[云函数] [forClaim] 调用成功', res.result)
        var tmp = this.data.Record
        tmp[e.currentTarget.dataset.index]._staffopenid='1'
        this.setData({
          Record: tmp
        })
        if (res.result === true){
          wx.showToast({
            title: '接单成功',
          })
        } else {
          wx.showToast({
            title: '该单已被接取',
            icon: 'none',
            duration: 3000
          })
        }
      }
    })
  }
})