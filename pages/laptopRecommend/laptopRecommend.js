// pages/laptopRecommend/laptopRecommend.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    Record: {},
    updatetime: '',
    switch: false,
    type: [{
      id: 1,
      name: '轻薄本',
      checked: false
    }, {
      id: 2,
      name: '全能本',
      checked: false
    }, {
      id: 3,
      name: '游戏本',
      checked: false
    }],
    brand: [{
      id: 1,
      name: '联想',
      checked: false
    }, {
      id: 2,
      name: '惠普',
      checked: false
    }, {
      id: 3,
      name: '戴尔',
      checked: false
    }, {
      id: 4,
      name: '华硕',
      checked: false
    }, {
      id: 5,
      name: '华为',
      checked: false
    }, {
      id: 6,
      name: '其他',
      checked: false
    }],
    price: [{
      id: 1,
      name: '4k以下',
      checked: false
    }, {
      id: 2,
      name: '4-5k',
      checked: false
    }, {
      id: 3,
      name: '5-6k',
      checked: false
    }, {
      id: 4,
      name: '6-8k',
      checked: false
    }, {
      id: 5,
      name: '8-10k',
      checked: false
    }, {
      id: 6,
      name: '10k以上',
      checked: false
    }]
  },

  change(e) {
    console.log(e.detail);
    let items = this.data.type;
    items.forEach(item => {
      if(item.id == e.detail.key) {
        item.checked = e.detail.checked;
      }
    });
    this.setData({
      type: items
    });
  },

  change2(e) {
    console.log(e.detail);
    let items = this.data.brand;
    items.forEach(item => {
      if(item.id == e.detail.key) {
        item.checked = e.detail.checked;
      }
    });
    this.setData({
      brand: items
    });
  },

  change3(e) {
    console.log(e.detail);
    let items = this.data.price;
    items.forEach(item => {
      if(item.id == e.detail.key) {
        item.checked = e.detail.checked;
      }
    });
    this.setData({
      price: items
    });
  },

  changeSwitch(e){
    this.setData({
      switch: e.detail.value
    })
  },

  toClaim(e) {
    var type = []
    var items = this.data.type;
    items.forEach(item => {
      if(item.checked == true) {
        type.push({_type: item.id})
      }
    });
    if(type.length === 0) type.push({})
    var brand = []
    var items = this.data.brand;
    items.forEach(item => {
      if(item.checked == true) {
        brand.push({_brand: item.id})
      }
    });
    if(brand.length === 0) brand.push({})
    var price = []
    var items = this.data.price;
    items.forEach(item => {
      if(item.checked == true) {
        price.push({_pricerange: item.id})
      }
    });
    if(price.length === 0) price.push({})
    wx.cloud.callFunction({
      name: 'query',
      data: {
        type: 'laptop',
        Record: {
          type: type,
          brand: brand,
          price: price,
        },
      },
      success: res => {
        this.setData({
          Record: res.result
        })
      }
    })
  },

  reset(e){
    this.setData({
      switch: false,
      type: [{
        id: 1,
        name: '轻薄本',
        checked: false
      }, {
        id: 2,
        name: '全能本',
        checked: false
      }, {
        id: 3,
        name: '游戏本',
        checked: false
      }],
      brand: [{
        id: 1,
        name: '联想',
        checked: false
      }, {
        id: 2,
        name: '惠普',
        checked: false
      }, {
        id: 3,
        name: '戴尔',
        checked: false
      }, {
        id: 4,
        name: '华硕',
        checked: false
      }, {
        id: 5,
        name: '华为',
        checked: false
      }, {
        id: 6,
        name: '其他',
        checked: false
      }],
      price: [{
        id: 1,
        name: '4k以下',
        checked: false
      }, {
        id: 2,
        name: '4-5k',
        checked: false
      }, {
        id: 3,
        name: '5-6k',
        checked: false
      }, {
        id: 4,
        name: '6-8k',
        checked: false
      }, {
        id: 5,
        name: '8-10k',
        checked: false
      }, {
        id: 6,
        name: '10k以上',
        checked: false
      }]
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
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    wx.lin.initValidateForm(this)
    const db = wx.cloud.database()
    db.collection('Schedule').where({type: 'laptopupdate'}).get().then(res => {
      console.log(res.data)
      this.setData({
        updatetime: res.data[0].updatetime
      })
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