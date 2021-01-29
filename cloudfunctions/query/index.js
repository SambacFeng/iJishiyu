// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const db = cloud.database()
  form = {}
  
  if (event.type === 'UserQuery'){
    form = (await db.collection('Forms').where({_openid: wxContext.OPENID}).orderBy('_time','desc').get()).data
  } else {
    usertype = (await db.collection('Member').where({_openid: wxContext.OPENID}).get()).data[0].type
    if (event.type === 'StaffQuery'){
      if (usertype != 1){
        return {}
      }
      form = (await db.collection('Forms').where({_staffopenid: wxContext.OPENID}).orderBy('_time','desc').get()).data
    } else if (event.type === 'formClaim'){
      if (usertype != 1){
        return {}
      }
      form = (await db.collection('Forms').where({_staffopenid: ''}).orderBy('_time','desc').get()).data
    } else if (event.type === 'ManagerMemberQuery'){
      if (usertype != 2){
        return {}
      }
      form = (await db.collection('Member').where({}).orderBy('_time','desc').get()).data
    } else if (event.type === 'ManagerFormsQuery'){
      if (usertype != 2){
        return {}
      }
      form = (await db.collection('Forms').where({}).orderBy('_time','desc').get()).data
    }
  }
  return form
}