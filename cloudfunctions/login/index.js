// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const db = cloud.database()
  var url = '../userIndex/userIndex'
  var Record = {}

  var re = (await db.collection('ServiceStart').where({}).get())
  if(re.data.length !== 0){
    var date = re.data[0].starttime
    url = '../closed/closed?y='+date.getFullYear().toString()+'&m='+(date.getMonth()+1).toString()+'&d='+date.getDate().toString()
    console.log(url)
    // return 
  } else {
    re = await db.collection('Member').field({
      name: true,
      phone: true,
      QQ: true,
      type: true,
    }).where({_openid: wxContext.OPENID}).get()
    console.log(re)
    if (re.data.length == 0){
      url = '../userIndex/userIndex'
    }
    else {
      Record = re.data[0]
      if (re.data[0].type === 2 || re.data[0].type === 3){//管理员
        url = '../managerIndex/managerIndex'
      }
      else if (re.data[0].type === 1){//队员
        url = '../staffIndex/staffIndex'
      }
    }
  }

  return {
    url: url,
    openid: wxContext.OPENID,
    Record: Record
  }
}