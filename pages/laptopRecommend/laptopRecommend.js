// pages/laptopRecommend/laptopRecommend.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    type: [{
      id: 1,
      name: "轻薄本",
      checked: false
    }, {
      id: 2,
      name: "全能本",
      checked: false
    }, {
      id: 3,
      name: "游戏本",
      checked: false
    }],
    brand: [{
      id: 1,
      name: "联想",
      checked: false
    }, {
      id: 2,
      name: "惠普",
      checked: false
    }, {
      id: 3,
      name: "戴尔",
      checked: false
    }, {
      id: 4,
      name: "华硕",
      checked: false
    }, {
      id: 5,
      name: "华为",
      checked: false
    }, {
      id: 6,
      name: "其他",
      checked: false
    }],
    price: [{
      id: 1,
      name: "4k以下",
      checked: false
    }, {
      id: 2,
      name: "4-5k",
      checked: false
    }, {
      id: 3,
      name: "5-6k",
      checked: false
    }, {
      id: 4,
      name: "6-8k",
      checked: false
    }, {
      id: 5,
      name: "8-10k",
      checked: false
    }, {
      id: 6,
      name: "10k以上",
      checked: false
    }]
  },

  change(e) {
    console.log(e);
    let items = this.data.type;
    items.forEach(item => {
      if(item.name === e.detail.key) {
        item.checked = e.detail.checked;
      }
    });
    this.setData({
      type: items
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