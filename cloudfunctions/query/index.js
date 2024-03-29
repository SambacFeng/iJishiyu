// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const db = cloud.database()
  const _ = db.command
  form = {}
  
  if (event.type === 'laptop'){
    form = (await db.collection('Laptop').where(_.and(
      _.or(event.Record.type),
      _.or(event.Record.brand),
      _.or(event.Record.price),
    )).orderBy('_fulltime','desc').get()).data
  } else if (event.type === 'UserQuery'){
    form = (await db.collection('Forms').where({_openid: wxContext.OPENID}).orderBy('_fulltime','desc').get()).data
  } else {
    usertype = (await db.collection('Member').where({_openid: wxContext.OPENID}).get()).data[0].type
    if (event.type === 'StaffQuery'){
      if (usertype !== 1 && usertype !== 2 &&usertype !== 3){
        return {}
      }
      form = (await db.collection('Forms').where({_staffopenid: wxContext.OPENID}).orderBy('_fulltime','desc').get()).data
    } else if (event.type === 'formClaim'){
      if (usertype !== 1 && usertype !== 2 &&usertype !== 3){
        return {}
      }
      form = (await db.collection('Forms').where({_staffopenid: ''})
      .orderBy('_timeArrange','desc')
      .orderBy('_fulltime','asc').get()).data
    } else if (event.type === 'ManagerMemberQuery'){
      if (usertype !== 2 &&usertype !== 3){
        return {}
      }
      form = (await db.collection('Member').where({
        _openid: _.neq("oMouO5T-ypxCHFZAtER4YYIzQEoY").and(_.neq("oMouO5f4a5eSrEma7SO4dLHmoNLw"))//Feng and Zhang
      }).orderBy('_fulltime','desc').get()).data
      var date = new Date()
      var dateofweek = date.getDay() || 7
      var fday = new Date(date.getFullYear(),date.getMonth(),date.getDate()-dateofweek+1)
      var ffday = new Date(date.getFullYear(),date.getMonth(),date.getDate()-dateofweek-7+1)
      
      const formdb = db.collection('Forms')

      for(var member in form){
        form[member].thisweek = (await formdb.where({
          _staffopenid: form[member]._openid,
          _fulltime: _.gte(fday),
        }).count()).total

        form[member].lastweek =(await formdb.where({
          _staffopenid: form[member]._openid,
          _fulltime: _.gte(ffday),
        }).count()).total
        form[member].lastweek -= form[member].thisweek
        
        form[member].total = (await formdb.where({_staffopenid: form[member]._openid}).count()).total
      }
      // console.log(form)
    } else if (event.type === 'ManagerFormsQuery'){
      if (usertype !== 2 &&usertype !== 3){
        return {}
      }
      form = (await db.collection('Forms').where({})
      .orderBy('_fulltime','desc').get()).data
    } else if (event.type === 'ManagerFeedback'){
      if (usertype !== 2 &&usertype !== 3){
        return {}
      }
      form = (await db.collection('Feedback').where({}).orderBy('_fulltime','desc').get()).data
    } else if (event.type === 'Worksheet'){
      if (usertype !== 1 && usertype !==2 &&usertype !== 3){
        return {}
      }
      form = (await db.collection('Worksheet').where({}).get()).data[0]
    } else if (event.type === 'SigninRecord'){
      if(usertype !== 2 &&usertype !== 3){
        return {}
      }
      form = (await db.collection('SigninRecord').where({}).orderBy('_fulltime','desc').get()).data
    }
  }
  return form
}