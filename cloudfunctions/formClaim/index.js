// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const db = cloud.database()

  re = (await db.collection('Forms').doc(event.id).get()).data._staffopenid
  if (re === ''){
    db.collection('Forms').doc(event.id).update({
      data: {
        _staffopenid: wxContext.OPENID
      }
    })
    return true
  }
  return false
}