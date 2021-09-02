// pages/staffRecruit/staffRecruit.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: '',
    gender: '男',
    nation: '',
    classes: '',
    phone: '',
    QQ: '',
    address: '',
    desc: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  inputName: function (options) {
    // console.log(options)
    this.setData({
      name: options.detail.value
    })
  },

  changeGender: function (options) {
    // console.log(options)
    this.setData({
      gender: options.detail.key
    })
  },

  inputNation: function (options) {
    this.setData({
      nation: options.detail.value
    })
  },

  inputClasses: function (options) {
    this.setData({
      classes: options.detail.value
    })
  },

  inputPhone: function (options) {
    this.setData({
      phone: options.detail.value
    })
  },

  inputQQ: function (options) {
    this.setData({
      QQ: options.detail.value
    })
  },

  inputAddress: function (options) {
    this.setData({
      address: options.detail.value
    })
  },

  inputDesc: function (options) {
    // console.log(options)
    this.setData({
      desc: options.detail.value
    })
  },

  checksubmit: function (options) {
    wx.showModal({
      cancelColor: 'cancelColor',
      title: '确认提交？',
      success: res=> {
        if(res.confirm) this.submit()
      }
    })
  },

  submit: function (){
    // console.log(this.data,res)
    this.setData({
      submitted: 1
    })


    
    var newinfo = {}
    newinfo.name = this.data.name
    newinfo.gender = this.data.gender
    newinfo.nation = this.data.nation
    newinfo.classes = this.data.classes
    newinfo.phone =this.data.phone
    newinfo.QQ = this.data.QQ
    newinfo.address = this.data.address
    newinfo.desc = this.data.desc
    
    for(var i in newinfo)
      if(newinfo[i] === '') {
        wx.showModal({
          title: '信息不全'
        })
        this.setData({
          submitted: 0
        })
        return
      }
    
    if(newinfo.phone.length != 11) {
      wx.showModal({
        title: '手机格式错误'
      })
      this.setData({
        submitted: 0
      })
      return 
    } else {
      for(var i in newinfo.phone) {
        if(newinfo.phone[i]>'9'||newinfo.phone[i]<'0') {
          wx.showModal({
            title: '手机格式错误'
          })
          this.setData({
            submitted: 0
          })
          return 
        }
      }
    }

    wx.cloud.callFunction({
      name: 'submitform',
      data: {
        type: 'RecruitNew',
        newinfo: newinfo
      },
      success: res => {
        console.log('[云函数][submitform]调用成功',res.result)
        this.setData({
          submitted: 2
        })
        if(res.result) {
          wx.showToast({
            title: '提交成功',
          })
        } else {
          wx.showToast({
            title: '提交失败',
          })
        }
        setTimeout(function () {//延时跳转
          wx.navigateBack({delta: 0})
        },2000) 
      },
      fail: res=> {
        this.setData({
          submitted: 0
        })
      }
    })
  },

  reset: function (options) {
    this.setData({
      name: '',
      gender: '男',
      nation: '',
      classes: '',
      phone: '',
      QQ: '',
      address: '',
      desc: ''
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