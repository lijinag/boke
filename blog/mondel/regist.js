// 引入数据库配置模块/
const mongoose = require('../configs/configs.js')
// 创建文章列表数据骨架/
const registSchema = new mongoose.Schema({
   account:String,
   password:String,
   imgurl:String,
   ctime:{
    type:Date,
    default:new Date()
   },
})
// 创建列表数据模型/
const regist= mongoose.model('regist', registSchema)
// 暴露
module.exports = regist