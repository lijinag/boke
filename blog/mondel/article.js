// 引入数据库配置模块/
const mongoose = require('../configs/configs.js')
// 创建文章列表数据骨架/
const articleSchema = new mongoose.Schema({
    column:{
        type:'Object',
        ref:'items' 
    },
    title: String,
    describe: String,
    author: String,
    words: String,
   ctime:{
    type:Date,
    default:new Date()
   },
   content: String,
})
// 创建列表数据模型/
const article = mongoose.model('article', articleSchema)
// 暴露
module.exports = article

// 