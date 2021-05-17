// pages/formQuery/formQuery.js
var Backup
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    Record: {},
    flag1: true,
    flag2: false,
    flag3: false,
    isadmin: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.cloud.callFunction({
      name: 'query',
      data: {
        type: 'ManagerFormsQuery'
      },
      success: res => {
        console.log('[云函数] [login] 调用成功',res.result)
        Backup = res.result
        this.allocating()
      }
    })
    this.setData({
      isadmin: app.globalData.staffInfo.type
    })
  },

  allocating(){
    var tmp = {}
    for(var i=0,id=0;i<Backup.length;i++){
      // console.log(Backup[i])
      if(Backup[i]._staffopenid === ""){
        tmp[id]=Backup[i]
        tmp[id++].faorder=i
      }
    }
    // console.log(tmp)
    this.setData({
      Record: tmp,
      flag1: true,
      flag2: false,
      flag3: false,
    })
  },

  repairing(){
    var tmp = {}
    for(var i=0,id=0;i<Backup.length;i++){
      // console.log(Backup[i])
      if(Backup[i]._staffopenid !== "" && Backup[i]._solvedtime === ""){
        tmp[id]=Backup[i]
        tmp[id++].faorder=i
      }
    }
    // console.log(tmp)
    this.setData({
      Record: tmp,
      flag1: false,
      flag2: true,
      flag3: false,
    })
  },

  done(){
    var tmp = {}
    for(var i=0,id=0;i<Backup.length;i++){
      // console.log(Backup[i])
      if(Backup[i]._solvedtime !== ""){
        tmp[id]=Backup[i]
        tmp[id++].faorder=i
      }
    }
    // console.log(tmp)
    this.setData({
      Record: tmp,
      flag1: false,
      flag2: false,
      flag3: true,
    })
  },

  addmember(indexx,res){
    if(res.confirm){
      console.log(this.data.Record[indexx])
      wx.cloud.callFunction({
        name: 'submitform',
        data: {
          type: 'addmember',
          formid: this.data.Record[indexx]._id,
          userinfo: {
            QQ: this.data.Record[indexx]._QQ,
            name: this.data.Record[indexx]._name,
            phone: this.data.Record[indexx]._phone,
            _openid: this.data.Record[indexx]._openid,
          }
        },
        success: res => {
          if(res.result){
            wx.showToast({
              title: '添加成功',
              icon: 'success',
              duration: 3000
            })
          }
          let tmp = this.data.Record
          tmp[indexx].added = true
          Backup[this.data.Record[indexx].faorder].added = true
          this.setData({
            Record: tmp
          })
        }
      })
    }else if(res.cancel){
      let tmp = this.data.Record
      tmp[indexx].addloading = false
      this.setData({
        Record: tmp
      })
    }
  },
  
  toCheck(e){
    let index = e.currentTarget.dataset.index
    let tmp = this.data.Record
    tmp[index].addloading=true
    this.setData({
      Record: tmp
    })
    wx.showModal({
      title: '确定添加？',
      success: this.addmember.bind(this,index)
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