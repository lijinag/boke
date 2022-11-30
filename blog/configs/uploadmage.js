// 引入依赖的模块/
const path = require('path')
const multer = require('multer')
const uid = require('uid')
const timestamp = require('time-stamp')
// 图片上传配置文件/
// @param{String} imagepath  文件保存路径文件夹
// @param{Array} imageTyle  上传文件类型例如:['image/jpeg','image/gif']
function uplad(imagepath, imageTyle) {
    //  文件位置 重命名的配置/
    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, imagepath)
        },
        // 文件名字/
        filename: function (req, file, cb) {
            // 扩展名/
            var extname = path.extname(file.originalname)
            // 文件重新命名/
            cb(null, file.fieldname + '_' + timestamp('YYYYMMDD') + '_' + uid() + extname);
        }
    })
    // 文件过滤器/
    function fileFilter(req, file, cb) {
        if (imageTyle.indexOf(file.mimetype) == -1) {
            cb(null, false)
            cb(new Error('请上传正确的图片格式'))
        } else {
            cb(null, true)
        }
    }
    // 配置/
    const upload= multer({
        // 文件路径/
        storage: storage,
        // 文件过滤器 函数/
        fileFilter: fileFilter,
    })
    // 返回值
    return upload;
}
// 暴露/
module.exports = uplad