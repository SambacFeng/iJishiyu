// pages/formCollect/formCollect.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    items: [
      {
        id: 1, 
        name: '重装系统', 
        ckecked: false},
      {
        id: 2, 
        name: '蓝屏、黑屏', 
        ckecked: false},
      {
        id: 3, 
        name: '网络问题，无法连接校园网等', 
        ckecked: false},
      {
        id: 4, 
        name: '软件安装、使用相关问题', 
        ckecked: false},
      {
        id: 5, 
        name: '拆机清灰、更换硅脂等', 
        ckecked: false},
      {
        id: 6, 
        name: '其他或问题不清楚，请在下方简单描述',
        ckecked: false},
    ]
  },

  change(e) {
    let items = this.data.items;
    items.forEach(item => {
      if(item.name === e.detail.key) {
        item.checked = e.detail.checked;
      }
    });
    this.setData({
      items: items
    });
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