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
  re = await db.collection('Member').where({_openid: wxContext.OPENID}).get()
  if (re.data.length == 0){
    url = '../userIndex/userIndex'
  }
  else {
    Record = re.data[0]
    if (re.data[0].type == 2){//管理员
      url = '../managerIndex/managerIndex'
    }
    else if (re.data[0].type == 1){//队员
      url = '../staffIndex/staffIndex'
    }
  }
  return {
    url: url,
    openid: wxContext.OPENID,
    Record: Record
  }
}