// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  // 事件处理函数
  bindViewTap() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad() {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
    if (app.globalData.indexurl === ''){
      wx.cloud.callFunction({
        name: 'login',
        data: {},
        success: res => {
          console.log('[云函数] [login] 调用成功 ', res.result.openid, res.result.url)
          app.globalData.indexurl = res.result.url
          app.globalData.staffInfo = res.result.Record
          if(res.result.url === '../userIndex/userIndex'){
            wx.redirectTo({
              url: app.globalData.indexurl,
            })
          } else {
            var fileid = 'cloud://jishiyutest-0gwe9qrfa9d62009.6a69-jishiyutest-0gwe9qrfa9d62009-1304847030/staffimg/'+app.globalData.staffInfo.name+'.jpg'
            wx.cloud.downloadFile({
              fileID: fileid,
              success: res => {
                console.log('[文件下载] 成功',res.tempFilePath)
                app.globalData.avatar = res.tempFilePath
                wx.redirectTo({
                  url: app.globalData.indexurl,
                })
              },
              fail: err => {
                console.log('[文件下载] 失败')
                wx.redirectTo({
                  url: app.globalData.indexurl,
                })
              }
            })
          }
        },
        fail: err => {
          console.error('[云函数] [login] 调用失败', err)
        }
      })
    } else {
      wx.redirectTo({
        url: app.globalData.indexurl,
      })
    }
  },
  getUserInfo(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
