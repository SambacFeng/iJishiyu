// pages/staffStatistic/staffStatistic.js
const app =getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    Record: {},
    admintype: false,
    isadmin: 0,
    loading: true
  },
  SetPermission() {
    if(this.data.admintype){
      this.setData({
        admintype: false,
      })
    }else{
      this.setData({
        admintype: true,
      })
    }
    console.log(this.data.admintype)
  },

  changeType(e) {
    console.log(e.detail)
    if(e.detail.cell.type !== e.detail.currentKey*1){
      wx.cloud.callFunction({
        name: 'submitform',
        data: {
          type: 'changemembertype',
          id: e.detail.cell._id,
          currenttype: e.detail.currentKey*1
        },
        success: res => {
          console.log('调用成功')
          if(res.result){
            wx.showToast({
              title: '成功',
              icon: 'success',
              duration: 2000
            })
          }else{
            wx.showToast({
              title: '失败',
              icon: 'none',
              duration: 2000
            })
          }
        }
      })
    }
  },

  delemember(indexx,res){
    if (res.confirm) {
      console.log('用户点击确定')
      wx.cloud.callFunction({
        name: 'submitform',
        data: {
          type: 'removemember',
          id: this.data.Record[indexx]._id,
        },
        success: res => {
          wx.showToast({
            title: '删除成功',
            icon: 'success',
            duration: 3000,
          })
          let tmp =this.data.Record
          tmp[indexx].deled = true
          this.setData({
            Record: tmp
          })
        }
      })
    } else if(res.cancel){
      let tmp = this.data.Record
      tmp[indexx].deleing = false
      this.setData({
        Record: tmp
      })
    }
  },

  toDelete(e){
    let index = e.currentTarget.dataset.index
    let tmp = this.data.Record
    tmp[index].deleing = true
    this.setData({
      Record: tmp
    })
    wx.showModal({
      title: '提示',
      content: '确定删除？',
      success: this.delemember.bind(this,index)
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      isadmin: app.globalData.staffInfo.type
    })
    wx.cloud.callFunction({
      name: 'query',
      data: {
        type: 'ManagerMemberQuery',
      },
      success: res => {
        this.setData({
          Record: res.result,
          loading: false,
        })
        console.log('[云函数] [query] 调用成功',res.result)
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