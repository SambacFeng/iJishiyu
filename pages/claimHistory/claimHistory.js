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
        console.log('[云函数] [query] 调用成功')
        this.setData ({
          Record: res.result
        })
      }
    })
  },

  toShow: function (options){
    /* 
      1. 给“更多”绑定的点击事件，把当前record的showDetail属性设置为true
      2. 列表渲染图片，给每个图片绑定点击事件查看大图
    */
    var index = options.currentTarget.dataset.index
    var tmp = this.data.Record
    tmp[index].showDetail^=1
    this.setData({
      Record: tmp
    })
    
    if(this.data.Record[index]._picsrc[0][0] === 'h') return 
    
    var picid = 0
    for(var i in this.data.Record[index]._picsrc) {
      var url = 'cloud://ijishiyu-6g6n5cncc846de79.696a-ijishiyu-6g6n5cncc846de79-1304847030/Forms/'+this.data.Record[index]._picsrc[i]
      wx.cloud.downloadFile({
        fileID: url,
        success: res=> {
          if(res.statusCode === 200) {
            console.log(res.tempFilePath)
            tmp[index]._picsrc[picid++] = res.tempFilePath
            this.setData({
              Record: tmp
            })
          }
        }
      })
    }
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