const multer = require('koa-multer'); //加载koa-multer模块
//文件上传
//配置
var storage = multer.diskStorage({

  //文件保存路径
  destination: function (req, file, cb) {
    cb(null, 'public/images/')
  },

  //修改文件名称
  filename: function (req, file, cb) {
    var fileFormat = (file.originalname).split(".");
    cb(null, Date.now() + "." + fileFormat[fileFormat.length - 1]);
  }
})

const fileFilter = (req, file, cb) => {
  // 过滤文件
var filetypes = /jpeg|jpg|png/;
var mimetype = filetypes.test(file.mimetype);
  if (!mimetype){
     return cb(new Error('This is not image file type'))
  } else {
    cb(null, true)
  }
}

//加载配置
const uploadFile = multer({
  storage: storage,
  //限制图片的大小
   limits: {
       fileSize: 1024 * 1024 * 10, // 10m的大小
       files: 1
     },
   fileFilter: fileFilter
}).single('file') // 上传图片 key值为 file

module.exports = uploadFile