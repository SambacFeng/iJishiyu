// pages/formCollect/formCollect.js
var tmpsrc = []

Page({

  /**
   * 页面的初始数据
   */
  data: {
    showPopup: false,
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
    ],
    submitted: false,
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

  solvePicture: function (options) {
    console.log(options.detail.all)
    tmpsrc = options.detail.all
  },

  submit(e){
    console.log(this.data)
    wx.showModal({
      cancelColor: 'cancelColor',
      content: '是否提交？',
      success: res => {
        if(res.confirm){
          var problem = []
          let items = this.data.items;
          items.forEach(item => {
            if(item.checked === true) {
              if(item.name !== "其他或问题不清楚，请在下方简单描述"){
                problem.push(item.name)
              } else {
                problem.push(this.data.problemDetail)
              }
            }
          });
          this.setData({
            problem: problem
          });

          if(this.data.name === ''){
            wx.showToast({
              title: '名字不能为空',
              icon: 'none'
            })
            return 
          } else if (this.data.phone.length !== 11){
            wx.showToast({
              title: '错误的号码格式',
              icon: 'none'
            })
            return 
          } else if (this.data.address === ''){
            wx.showToast({
              title: '地址不能为空',
              icon: 'none'
            })
            return 
          } else if (this.data.problem.length === 0){
            wx.showToast({
              title: '未选择问题',
              icon: 'none'
            })
            return 
          } 
          this.setData({
            submitted: true,
          })

          var picsrc = []

          var date = new Date()
          var years = date.getFullYear().toString()
          var months = (date.getMonth()+1).toString()
          if (months.length < 2) months = '0'+months
          var days = date.getDate().toString()
          if (days.length < 2) days = '0'+days
          var hours = date.getHours().toString()
          if (hours.length < 2) hours = '0'+hours
          var minutes = date.getMinutes().toString()
          if (minutes.length < 2) minutes = '0'+minutes
          var time = years+months+days+hours+minutes

          for(var i in tmpsrc) {
            var name=time+this.data.name+i+'.jpg'
            picsrc.push(name)
            wx.cloud.uploadFile({
              cloudPath: 'Forms/'+name,
              filePath: tmpsrc[i].url,
              success: res=> {
                console.log('图片上传成功')
              },
              fail: res => {
                console.log('图片上传失败')
              }
            })
          }
          wx.cloud.callFunction({
            name: 'submitform',
            data: {
              type: 'userform',
              Record: {
                _name: this.data.name,
                _gender: this.data.gender,
                _phone: this.data.phone,
                _QQ: this.data.QQ,
                _address: this.data.address,
                _problem: this.data.problem,
                _picsrc: picsrc,
                _timeArrange: this.data.timeArrange,
              }
            },
            success: res => {
              console.log('[云函数] [submitform] 执行成功',res.result)
              wx.redirectTo({
                url: '../formSubmit/formSubmit',
              })
            },
            fail: res=>{
              console.log('[云函数] [submitform] 执行失败')
              this.setData({
                submitted: false,
              })
            }
          })
        }
      }
    })
  },

  reset(e){
    this.setData({
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
    })
  },

  onHidePopupTap() {
    this.data.showPopup = false;
    this.setData({
      showPopup: this.data.showPopup
    });
    let stoptype = this.data.stoptype
    if(stoptype !==1){
      wx.navigateBack({
        delta: 0,
      })
    }
  },

  onPopupTap() {
    wx.showToast({
      title: '请阅读提示文字后点击按钮取消！',
      icon: 'none'
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    wx.lin.initValidateForm(this)
    this.setData({
      submitted: false,
    })
    const db = wx.cloud.database()
    db.collection('Schedule').where({type: 'servicetime'}).limit(1).get().then(res => {
      console.log(res.data)
      if(res.data.length !== 0){
        res = res.data[0]
        this.setData({
          showPopup: res.showPopup,
          stoptype: res.stoptype,
          stoptime: res.stoptime,
          starttime: res.starttime,
        })
      }
    })
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