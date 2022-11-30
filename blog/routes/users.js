// 引入express框架/
var express = require('express');
// 引入路由/
var router = express.Router();
// 引入后台控制器/
var users=require('../kzq/users.js')
// 后台首页/
router.get('/',users.index);
// 添加项目页面/
router.get('/item',users.item);
// 添加项目数据/
router.post('/itemInet',users.itemInet);
// 添加项目列表页面/
router.get('/list',users.list );
// 编辑项目列表/
router.get('/editor/:_id',users.editor );
// 修改项目列表/
router.post('/update',users.update );
// 删除项目列表/
router.get('/delete/:_id',users.delete);
// 发布文章页面/
router.get('/article',users.article);
// // 添加文章内容/
router.post('/articleInet',users.articleInet);
// // 添加文章内容页面/
router.get('/de',users.de );
// 文章内容分页/
router.get('/de/:page',users.de );
// 编辑项目列表/
router.get('/tor/:_id',users.tor );
// 修改文章列表/
router.post('/articlupdate',users.articlupdate );
// 删除文章列表/
router.get('/tete/:_id',users.tete);
// 管理注册页面/
router.get('/registered',users.registered);
// 注册数据提交/
router.post('/registInet',users.registInet);
// 验证码模块/
router.get('/code',users.code);
// 添加管理登录列表/
router.get('/login',users. login );
// 删除文章列表/
router.get('/off/:_id',users.off);
// 编辑管理列表/
router.get('/The/:_id',users.The );
// 修改登录列表/
router.post('/upda',users.upda );
// 登录页面/
router.get('/page',users.page);
// 登录数据提交/
router.post('/pageInet',users.rpageInet);
// 退出登录/
router.get('/out',users.out );
// 友情链接/
router.get('/management',users.management);
// 友情链接提交/
router.post('/managementInet',users.managementInet);
// 添加友情列表页面/
router.get('/managementlist',users.managementlist );
// 编辑友情列表/
router.get('/programming/:_id',users.programming);
// 修改友情列表/
router.post('/managementupate',users.managementupate);
// 删除友情列表/
router.get('/scattered/:_id',users.scattered);
module.exports = router;
