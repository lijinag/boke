// 引入express框架/
var express = require('express');
// 引入路由/
var router = express.Router();
// 引入前台控制器/
var inde = require('../kzq/index.js')
// 前台路由/
router.get('/', inde.index);
// router.get('inde', inde.index);
// 前台栏目行/
router.get('/column', inde.column);
// 前台项目/
router.get('/project', inde.project);
// 前台文章/
router.get('/article', inde.article);
// 前台系统/
router.get('/system', inde.system);
// 前台友情/
router.get('/friendship', inde.friendship);
// 前台内容/
router.get('/body', inde.body);
// 前台内容项目/
router.get('/tem',inde.tem);
router.get('/tm/:_id',inde.tm );
// 前台内容文章/
router.get('/Articl',inde.Articl);
router.get('/ar/:_id',inde.ar );
// 前台内容系统/
router.get('/Conten',inde.Conten);
router.get('/cont/:_id',inde.cont );
module.exports = router;
