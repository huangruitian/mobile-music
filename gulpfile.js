var gulp = require("gulp");
var htmlClean = require("gulp-htmlclean");//压缩html
var imageMin = require("gulp-imagemin");//压缩图片
var uglify = require("gulp-uglify");//压缩JS
var stripDebug = require("gulp-strip-debug");//去掉JS调试语句
//less -> 自动添加css3的前缀 --> 压缩css
var less = require("gulp-less");
var cleanCss = require("gulp-clean-css")//压缩css
// var babel = require("gulp-babel");
// gulp-postcss autoprefixer 自动给CSS3属性加前缀，兼容性问题
var postCss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
//开启服务器
var connect = require("gulp-connect");

var folder = {
    src:"src/",
    dist:"dist/",
}
//判断当前环境变量
var devMode = process.env.NODE_ENV == "development";
//可以在git设置当前环境变量 export NODE_ENV = development

console.log(devMode);

//html任务
gulp.task("html",function(){
   var page = gulp.src(folder.src + "html/*")
        .pipe(connect.reload());
        if(!devMode){
            page.pipe(htmlClean())
        }
        page.pipe(gulp.dest(folder.dist + "html/"))
});
//image任务
gulp.task("image",function(){
    gulp.src(folder.src + "image/*")
        .pipe(connect.reload())    
        .pipe(imageMin())
        .pipe(gulp.dest(folder.dist + "image/"))
});
//css任务
gulp.task("css",function(){
    var page = gulp.src(folder.src + "css/*")
        .pipe(connect.reload())        
        .pipe(less())
        .pipe(postCss([autoprefixer()]))//postcss 需要传入autoprefixer插件
        if(!devMode){
            page.pipe(cleanCss())
        }
        page.pipe(gulp.dest(folder.dist + "css/"))
});
//js任务
gulp.task("js",function(){
    var page = gulp.src(folder.src + "js/*")
        .pipe(connect.reload())//自动刷新    
        if(!devMode){
           /* page.pipe(babel({
           //     presets: ['es2015'] // es5检查机制,解决不能压缩JS
           // }))*/
            page.pipe(stripDebug())
            page.pipe(uglify())
        }
        page.pipe(gulp.dest(folder.dist + "js/"))
});

//server 
gulp.task("server",function(){
      connect.server({
          port:"8888",
          livereload:true,
      });
});

//监听文件
gulp.task("watch",function(){
    gulp.watch(folder.src + "html/*",["html"])
    gulp.watch(folder.src + "css/*",["css"])
    gulp.watch(folder.src + "js/*",["js"])
    gulp.watch(folder.src + "image/*",["image"])    
})

gulp.task("default",["html","image","css","js","server","watch"]);