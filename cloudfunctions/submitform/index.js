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
  
  if (event.type === 'userform'){
    var tmp = event.Record
    tmp._openid=wxContext.OPENID
    tmp._staffopenid=''
    tmp._solved=false
    tmp._claimtime=''
    tmp._solvedtime=''
    tmp._time=time
    tmp._fulltime=date
    db.collection('Forms').add({
      data: tmp
    })
    return true
  } else if (event.type == 'userfeedback'){
    var tmp = event.Record
    tmp._openid = wxContext.OPENID
    tmp.time = time
    tmp.fulltime = date
    db.collection('Feedback').add({
      data: tmp
    })
    return true
  } 
  return false
}