// pages/feedbackCollect/feedbackCollect.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    items: [
      {
        id: 1, 
        name: '电脑问题已全部被解决', 
        ckecked: false
      },{
        id: 2, 
        name: '电脑问题基本被解决，可能仍有少许问题', 
        ckecked: false
      },{
        id: 3, 
        name: '电脑问题没有得到解决', 
        ckecked: false
      },{
        id: 4, 
        name: '其他，请在下方意见栏描述您遇到的情况', 
        ckecked: false
      }
    ]

  },

  submit(e){
    console.log("提交成功", e)
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