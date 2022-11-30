// 前台控制器/
var inde = {}
// 引入项目数据模型/
var itemmondel = require('../mondel/item.js')
// 引入文章数据模型/
var articlemondel = require('../mondel/article.js')
// 引入管理注册模型/
var registemondel = require('../mondel/regist.js')
var management=require('../mondel/management.js')
// // 首页/
inde.index = function (req, res) {
    // 响应模板/
    res.render('inde/index')
}
// 栏目行/
inde.column = function (req, res) {
    // if(!req.session.user)res.redirect('/users/page')
    // 响应模板/
    res.render('inde/column')
    // res.send('ok')
}
// 项目列表/
inde.project = function (req, res) {
    // if(!req.session.user)res.redirect('/users/page')
    // 响应模板/
    itemmondel.find(function (err, data) {
        if (err) {
            res.send(err)
        } else {
            // res.send(data)
            res.render('inde/project', { title: data })
        }

    })
}
// 文章/
inde.article = function (req, res) {
    // 响应模板/
      articlemondel.find({}).populate('column ', { name: 1 }).exec(function (err, data) {
                if (err) {
                    res.send(err)
                } else {
                 res.render('inde/article', { users: data })
                }
            })
}
// 系统/
inde.system = function (req, res) {
    // 响应模板/
    registemondel.find(function (err, data) {
        if (err) {
            res.send(err)
        } else {
    res.render('inde/system',{ title: data })
        }
    })
}
// 友情/
inde.friendship = function (req, res) {
      // 响应模板/
      management.find(function (err, data) {
        if (err) {
            res.send(err)
        } else {
    res.render('inde/friendship',{ title: data })
        }
    })
}
// 内容/
inde.body = function (req, res) {
    // 响应模板/
    res.render('inde/body')
}
// 内容项目/
inde.tem = function (req, res) {
    // 响应模板/
    itemmondel.find(req.params,function (err, data) {
        if (err) {
            res.send(err)
        } else {
            res.render('inde/tem',{ title: data})
        }
    })
}
inde.tm =function(req,res){
    itemmondel.find(req.params, function (err, data) {
        if (err) {
            res.send(err)
        } else {
            res.render('inde/tm', { accept: data[0] })
        }
    })
}
// 内容文章/
inde.Articl=function(req,res){
    // 响应模板/
    articlemondel.find({}).populate('column ', { name: 1 }).exec(function (err, data) {
        if (err) {
            res.send(err)
        } else {
         res.render('inde/Articl', { users: data })
        }
    })
}
inde.ar=function(req,res){
    articlemondel.find(req.params, function (err, data) {
        if (err) {
            res.send(err)
        } else {
            res.render('inde/ar', { ac: data[0] })
        }
    })
}
// 内容系统/
inde.Conten=function(req,res){

     // 响应模板/
     registemondel.find(function (err, data) {
        if (err) {
            res.send(err)
        } else {
    res.render('inde/Conten',{ title: data })
        }
    })
}
inde.cont=function(req,res){
      // 响应模板/
        // 响应模板/
        registemondel.find(req.params, function (err, data) {
            if (err) {
                res.send(err)
            } else {
                res.render('inde/cont', { apptin: data[0] })
            }
        })
}
// 暴露后台控制器/
module.exports = inde

