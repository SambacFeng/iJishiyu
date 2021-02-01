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
  var time = date.getFullYear().toString()+'-'+(date.getMonth()+1).toString()+'-'+date.getDate().toString()+' '+date.getHours().toString()+':'+date.getMinutes().toString()
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