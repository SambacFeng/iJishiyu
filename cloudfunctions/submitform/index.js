// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const db = cloud.database()
  // console.log(event)
  // console.log(date,time)
  if (event.type === 'userform'){
    var tmp = event.Record
    tmp._openid=wxContext.OPENID
    tmp._staffopenid=''
    tmp._solved=false
    tmp._claimtime=''
    tmp._solvedtime=''
    db.collection('Forms').add({
      data: tmp
    })
    return true
  } else if (event.type == 'userfeedback'){
    var tmp = event.Record
    tmp._openid = wxContext.OPENID
    db.collection('Feedback').add({
      data: tmp
    })
    return true
  } else if (event.type == 'staffreport'){

  }
}