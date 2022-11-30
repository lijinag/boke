// 数据库配置文件/
// 引入mongoose模块/
const mongoose = require('mongoose');
// 数据库地址/
const NAB='mongodb://127.0.0.1:27017/man'
// 连接数据库/
mongoose.connect(NAB,function(err){
    if(err){
        console.log('数据库连接失败');
    }else{
        console.log('数据库连接成功');
    }
})
//  暴露
module.exports=mongoose