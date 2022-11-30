// 引入数据库配置模块/
const mongoose = require('../configs/configs.js')
// 创建文章列表数据骨架/
const managementSchema = new mongoose.Schema({
    // address:{
    //     type:'Object',
    //     ref:'items' 
    // },
    of: String,
    type: String,
    rhythm: String,
    from: String,
   ctime:{
    type:Date,
    default:new Date()
   },
   content: String,
})
// 创建列表数据模型/
const management = mongoose.model('management', managementSchema)
// 暴露
module.exports = management

// 