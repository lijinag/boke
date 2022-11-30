// 引入数据库配置模块/
const mongoose = require('../configs/configs.js')
// 创建列表数据骨架/
const itemSchema = new mongoose.Schema({
    name: String,
    describe: String,
})
// 创建列表数据模型/
const model = mongoose.model('items', itemSchema)
// 暴露
module.exports = model

