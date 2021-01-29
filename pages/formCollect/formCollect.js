// pages/formCollect/formCollect.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: '',
    gender: '男',
    phone: '',
    QQ: '',
    address: '',
    problem: [],
    problemDetail: '',
    timeArrange: '一周以内',

    items: [
      {
        id: 1, 
        name: '重装系统', 
        checked: false},
      {
        id: 2, 
        name: '蓝屏、黑屏', 
        checked: false},
      {
        id: 3, 
        name: '网络问题，无法连接校园网等', 
        checked: false},
      {
        id: 4, 
        name: '软件安装、使用相关问题', 
        checked: false},
      {
        id: 5, 
        name: '拆机清灰、更换硅脂等', 
        checked: false},
      {
        id: 6, 
        name: '其他或问题不清楚，请在下方简单描述',
        checked: false}
    ]
  },

  inputName(e){
    // console.log(e)
    this.setData({
      name: e.detail.value
    })
  },

  changeGender(e){
    // console.log(e)
    this.setData({
      gender: e.detail.key
    })
  },

  inputPhone(e){
    // console.log(e)
    this.setData({
      phone: e.detail.value
    })
  },

  inputQQ(e){
    // console.log(e)
    this.setData({
      QQ: e.detail.value
    })
  },

  inputAddress(e){
    // console.log(e)
    this.setData({
      address: e.detail.value
    })
  },

  change(e) {
    // console.log(e);
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

  inputProblemDetail(e){
    this.setData({
      problemDetail: e.detail.value
    })
  },

  changeTimeArrange(e){
    // console.log(e)
    this.setData({
      timeArrange: e.detail.key
    })
  },

  submit(e){
    // console.log("提交成功", e)
    console.log(this.data)
    var problem = []
    let items = this.data.items;
    items.forEach(item => {
      if(item.checked === true) {
        if(item.name !== "其他或问题不清楚，请在下方简单描述"){
          problem.push(item.name)
        }
      }
    });
    this.setData({
      problem: problem
    });
    wx.cloud.callFunction({
      name: 'submitform',
      data: {
        _name: this.data.name,
        _gender: this.data.gender,
        _phone: this.data.phone,
        _QQ: this.data.QQ,
        _address: this.data.address,
        _problem: this.data.problem,
        _problemDetail: this.data.problemDetail,
        _timeArrange: this.data.timeArrange,
        _time: new Date(),
        _openid: '',
        _staffopenid: '',
        _solved: false
      },
      success: res => {
        console.log('[云函数] [submitform] 执行成功')
        wx.showToast({
          title: '提交成功，我们会尽快为您处理',
          duration: 3000
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    wx.lin.initValidateForm(this)
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