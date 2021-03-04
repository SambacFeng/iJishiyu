// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const db = cloud.database()

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
  var time = years+'-'+months+'-'+days+' '+hours+':'+minutes

  if(event.type === 'formcomplete'){
    var tmp = event.Record
    tmp._solvedtime = time
    db.collection('Forms').doc(event.id).update({
      data: tmp
    })
    return true
  } else {
    re = (await db.collection('Forms').doc(event.id).get()).data._staffopenid
    if (re === ''){
      db.collection('Forms').doc(event.id).update({
        data: {
          _staffopenid: wxContext.OPENID,
          _staffname: event.staffname,
          _staffQQ: event.staffQQ,
          _staffphone: event.staffphone,
          _claimtime: time
        }
      })
      return true
    }
  }

  return false
}