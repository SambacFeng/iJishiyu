// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const db = cloud.database()

  var date = new Date()
  var time = date.getFullYear().toString()+'-'+(date.getMonth()+1).toString()+'-'+date.getDate().toString()+' '+date.getHours().toString()+':'+date.getMinutes().toString()
  re = (await db.collection('Forms').doc(event.id).get()).data._staffopenid
  if (re === ''){
    db.collection('Forms').doc(event.id).update({
      data: {
        _staffopenid: wxContext.OPENID,
        _claimtime: time,
        _staffname: event.staffname,
        _staffQQ: event.staffQQ,
        _staffphone: event.staffphone
      }
    })
    return true
  }
  return false
}