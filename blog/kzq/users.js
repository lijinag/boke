// 后台控制器/
var users = {}
// 引入项目数据模型/
var itemmondel = require('../mondel/item.js')
// 引入文章数据模型/
var articlemondel = require('../mondel/article.js')
// 引入管理注册模型/
var registemondel = require('../mondel/regist.js')
var management=require('../mondel/management.js')
// 引入友情管理模型/
// 首页/
users.index = function (req, res) {
    if(!req.session.user)res.redirect('/users/page')
    // 响应模板/
    res.render('users/index')
}
// 项目/
users.item = function (req, res) {
    if(!req.session.user)res.redirect('/users/page')
    // 响应模板/
    res.render('users/item')
}
// 添加项目数据/
users.itemInet = function (req,res) {
    // if(!req.session.user)res.redirect('/users/page')
    // 插入数据/
    itemmondel.create(req.body, function (err) {
        if (err) {
            res.send('插入失败')
        } else {
            res.redirect('/users/list')
        }

    })
}
// 列表/
users.list = function (req, res) {
    if(!req.session.user)res.redirect('/users/page')
    // 响应模板/
    itemmondel.find(function (err, data) {
        if (err) {
            res.send(err)
        } else {
            res.render('users/list', { title: data })
        }

    })
}
// 编辑项目列表/
users.editor = function (req, res) {
    // if(!req.session.user)res.redirect('/users/page')

    itemmondel.find(req.params, function (err, data) {
        if (err) {
            res.send(err)
        } else {
            res.render('users/editor', { accept: data[0] })
        }

    })

}
// 修改项目列表/
users.update = function (req, res) {
    // if(!req.session.user)res.redirect('/users/page')

    itemmondel.update({ _id: req.body._id }, req.body, function (err) {
        if (err) {
            res.send(err)
        } else {
            res.redirect('/users/list')
        }

    })
}
// 删除项目列表/
users.delete = function (req, res) {
    itemmondel.deleteOne(req.params, function (err) {
        if (err) {
            res.send(err)
        } else {
            res.redirect('/users/list')
        }
    })

}
// 发布文章/
users.article = function (req, res) {
    if(!req.session.user)res.redirect('/users/page')
    itemmondel.find(function (err, data) {
        if (err) {
            res.send(err)
        } else {
            // 响应模板/
            res.render('users/article', { title: data })
        }
    })
}
// 发布文章/
users.articleInet = function (req, res) {
    // if(!req.session.user)res.redirect('/users/page')
    // 插入数据/
    articlemondel.create(req.body, function (err) {
        if (err) {
            res.send('插入失败')
        } else {
            res.redirect('/users/de')
        }
    })
}
// 文章内容/
users.de = function (req, res) {
    if(!req.session.user)res.redirect('/users/page')
    // 页数
    var page = req.params.page ? req.params.page : 1;
    // 每页多少条
    var pagenum = 5;
    articlemondel.find({}).count(function (err, mun) {
        if (err) {
            res.send('操作失败')
        } else {
            // 一共多少页/
            var pageMax = Math.ceil(mun / pagenum);
            // 查询/
            articlemondel.find({}).skip(pagenum * (page - 1)).limit(pagenum).populate('column ', { name: 1 }).exec(function (err, data) {
                if (err) {
                    res.send(err)
                } else {
                    // 一共多少页
                    data["pageMax"] = pageMax;
                    // 页数
                    data["page"] = page;
                    res.render('users/de', { users: data })
                }
            })
        }
    })
}
// 编辑文章列表/
users.tor = function (req, res) {
    // if(!req.session.user)res.redirect('/users/page')
    articlemondel.find(req.params, function (err, data) {
        if (err) {
            res.send(err)
        } else {
            // 响应模板/
            itemmondel.find(function (err, data1) {
                if (err) {
                    res.send(err)
                } else {
                    res.render('users/tor', { acc: data[0], title: data1 })
                }
            })
        }
    })

}
// 修改文章列表/
users.articlupdate = function (req, res) {
    // if(!req.session.user)res.redirect('/users/page')
    articlemondel.update({ _id: req.body._id }, req.body, function (err) {
        if (err) {
            res.send(err)
        } else {
            res.redirect('/users/de')
        }
    })
}
// 删除文章列表/
users.tete = function (req, res) {
    articlemondel.deleteOne(req.params, function (err) {
        if (err) {
            res.send(err)
        } else {
            res.redirect('/users/de')
        }
    })
}
// 管理注册页面/
users.registered = function (req, res) {
    if(!req.session.user)res.redirect('/users/page')

    // 响应模板/
    res.render('users/registered')
}
// 注册数据提交/
users.registInet = function (req, res) {
    // if(!req.session.user)res.redirect('/users/page')
    // 引入图片上传模块/
    var upladImage = require('../configs/uploadmage.js')
    // 调用文件上传函数/
    var uploada = upladImage('up',['image/jpeg', 'image/gif','image/webp']).single('imgurl')
    // // 接收图片/
    uploada(req, res, function (err) {
        if (err) {
            res.send('上传失败')
        } else {
            // 判断验证码
            if (req.body.code != req.session.code) {
                res.send('验证失败')
                return
            }
            // 判断两次密码是否一直/
            if (req.body.password != req.body.confirm) {
                res.send('密码不一致')
                return
            }
            // 去掉前后空格/
            req.body.account = req.body.account.trim()
            // 密码加密/
            var md5 = require('md5')
            req.body.password = md5(req.body.password)
            // 图片路径保存/
            req.body.imgurl=req.file.filename;
            // 数据插入数据库/
            registemondel.create(req.body, function (err) {
                if (err) {
                    res.send('插入失败')
                } else {
                    res.redirect('/users/login')
                }
            })
        }
    })
}
// 管理登录列表/
users.login = function (req, res) {
    if(!req.session.user)res.redirect('/users/page')
    // 当前页码/
    var page = req.query.page ? req.query.page : 1
    // 每页页多少条数据/
    var pageSize = 3
    // 一共有多少条数据/
    registemondel.find({}).count(function (err, total) {
        if (err) {
            res.send('操作失败')
        } else {
            // 一共有多少页/
            var pageMax = Math.ceil(total / pageSize)
            // 判断最大页码的边距/
            if (page > pageMax) {
                page = pageMax
            }
            // 判断最小页码的边距/
            if (page < 1) {
                page = 1
            }
            // 从第几页开始查/
            var offset = pageSize * (page - 1)
            // 查询
            registemondel.find({}).limit(pageSize).skip(offset).exec(function (err, data) {
                if (err) {
                    res.send(err)
                } else {
                    res.render('users/login', { title: data, pageMax: pageMax, page: page })
                }
            })
        }
    })
}

// 删除登录列表/
users.off = function (req, res) {
    registemondel.deleteOne(req.params, function (err) {
        if (err) {
            res.send(err)
        } else {
            res.redirect('/users/login')
        }
    })

}
// 编辑登录列表/
users.The = function (req, res) {
    // if(!req.session.user)res.redirect('/users/page')

    // 响应模板/
    registemondel.find(req.params, function (err, data) {
        if (err) {
            res.send(err)
        } else {
            res.render('users/The', { apptin: data[0] })
        }

    })
}

// 修改登录列表/
users.upda = function (req, res) {
    // if(!req.session.user)res.redirect('/users/page')
    registemondel.update({ _id: req.body._id }, req.body, function (err) {
        if (err) {
            res.send(err)
        } else {
            res.redirect('/users/login')
        }

    })
}
// 登录页面/
users.page = function (req, res) {

    // 响应模板/

    res.render('users/page')
}
// 注册数据提交/
users.rpageInet = function (req, res) {
    // if(!req.session.user)res.redirect('/users/page')

    // 判断验证码/
    if (req.body.code != req.session.code) {
        res.send('验证失败')
        return
    }
    // 去掉前后空格/
    req.body.account = req.body.account.trim()
    // 密码加密/
    var md5 = require('md5')
    req.body.password = md5(req.body.password)
    registemondel.findOne({ account: req.body.account }, function (err, data) {
        if (err) {
            res.send('登录失败')
        } else {
            if (data == null) {
                //    账号不存在/
                console.log(账号存在);
                res.send('账号或密码不正确')
            } else {
                // 账号存在，判断密码/
                if (req.body.password == data.password) {
                    // 密码正确/
                    req.session.user = data
                    res.redirect('/users')
                } else {
                    // 密码不正确/
                    console.log('密码不正确');
                    res.send('账号或密码不正确')

                }
            }
        }
    })

}
// 退出登录/
users.out = function (req, res) {
    // 清空登录信息/
    req.session.user = null
    // 跳转页面/
    res.redirect('/users/page')
}
//
// 验证码模块/
users.code = function (req, res) {
    // 引入验证模块/
    var captchapng = require('captchapng');
    // 生成验证码/
    var num = parseInt(Math.random() * 9000 + 1000)
    var p = new captchapng(80, 20, num);
    // 保存验证码/
    req.session.code = num
    p.color(0, 0, 0, 0);
    p.color(80, 80, 80, 255);
    var img = p.getBase64();
    var imgbase64 = new Buffer(img, 'base64');
    res.send(imgbase64)
}
// 友情链接首页/
users.management=function(req,res){
    res.render('users/management')
    
}
// 友情链接提交/
users.managementInet = function (req, res) {
    // if(!req.session.user)res.redirect('/users/page')
    // 插入数据/
    management.create(req.body, function (err) {
        if (err) {
            res.send('插入失败')
        } else {
            res.redirect('/users/managementlist')
        }

    })
}
// 友情列表/
users.managementlist = function (req, res) {
    if(!req.session.user)res.redirect('/users/page')

 // 当前页码/
 var page = req.query.page ? req.query.page : 1
 // 每页页多少条数据/
 var pageSize = 3
    // 一共有多少条数据/
    management.find({}).count(function (err, total) {
        if (err) {
            res.send('操作失败')
        } else {
            // 一共有多少页/
            var pageMax = Math.ceil(total / pageSize)
            // 判断最大页码的边距/
            if (page > pageMax) {
                page = pageMax
            }
            // 判断最小页码的边距/
            if (page < 1) {
                page = 1
            }
            // 从第几页开始查/
            var offset = pageSize * (page - 1)
            // 查询
            management.find({}).limit(pageSize).skip(offset).exec(function (err, data) {
                if (err) {
                    res.send(err)
                } else {
                    res.render('users/managementlist', { title: data, pageMax: pageMax, page: page })
                }
            })
        }
    })
}
// 编辑友情列表/
users.programming = function (req, res) {
    if(!req.session.user)res.redirect('/users/page')
    management.find(req.params, function (err, data) {
        if (err) {
            res.send(err)
        } else {
            res.render('users/programming', { ept: data[0] })
        }
    })
}
// 修改友情列表/
users.managementupate = function (req, res) {
    // if(!req.session.user)res.redirect('/users/page')

    management.update({ _id: req.body._id }, req.body, function (err) {
        if (err) {
            res.send(err)
        } else {
            res.redirect('/users/managementlist')
        }

    })
}
// 删除友情列表/
users.scattered = function (req, res) {
    management.deleteOne(req.params, function (err) {
        if (err) {
            res.send(err)
        } else {
            res.redirect('/users/managementlist')
        }

    })

}
// 暴露后台控制器/
module.exports = users


