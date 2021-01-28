// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const db = cloud.database()
  
  if (event.type == 'userform'){
    form = {
      _openid: wxContext.OPENID,
      // _name: event.item.name
    }
    db.collection('Forms').add({
      data: form,
      success: res => {

      },
      fail: err => {

      }
    })
  } else if (event.type == 'userfeedback'){

  } else if (event.type == 'staffreport'){

  }
}