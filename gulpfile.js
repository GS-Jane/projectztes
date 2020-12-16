// 引入gulp文件

const gulp = require('gulp');
const cssmin = require('gulp-cssmin');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const htmlmin = require('gulp-htmlmin');
const gulpclean = require('gulp-clean');
const webserver = require('gulp-webserver');

function css() {
    return gulp.src('./src/css/*.css')
        .pipe(cssmin())
        .pipe(gulp.dest('./dist/css'))

}


// js压缩
function js() {
    return gulp.src('./src/js/**')
        .pipe(babel({
            presets: ["env"]
        }))
        .pipe(uglify())
        .pipe(gulp.dest('./dist/js'))
}

function utilsjs() {
    return gulp.src('./src/utils/**')
        .pipe(babel({
            presets: ["env"]
        }))
        .pipe(uglify())
        .pipe(gulp.dest('./dist/utils'))
}

function html() {
    return gulp.src('./src/html/*.html')
        .pipe(htmlmin({
            collapseWhitespace: true, // 表示去除空格
            removeEmptyAttributes: true, // 移出空的属性
            minifyCSS: true, // 压缩 style 标签
            minifyJS: true, // 压缩 script 标签
        }))
        .pipe(gulp.dest('./dist/html'))
}

function htmls() {
    return gulp.src('./src/*.html')
        .pipe(htmlmin({
            collapseWhitespace: true, // 表示去除空格
            removeEmptyAttributes: true, // 移出空的属性
            minifyCSS: true, // 压缩 style 标签
            minifyJS: true, // 压缩 script 标签
        }))
        .pipe(gulp.dest('./dist'))
}

// 复制静态资源文件（img等）
// function data() {
//     return gulp.src('./src/data/**')
//         .pipe(gulp.dest('./dist/data'))
// }

function static() {
    return gulp.src('./src/static/**')
        .pipe(gulp.dest('./dist/static'))
}


// 创建一个清楚缓存的任务
function clean() {
    return gulp
        .src(['./dist'])
        .pipe(gulpclean());
}
// 创建一个打开服务器的任务
function server() {
    return gulp
        .src('./dist')
        .pipe(webserver({
            host: 'localhost',
            port: 3000,
            open: './shouye.html',
            livereload: true,
        }))
}

function watchs() {
    gulp.watch('./src/css', css);
    gulp.watch('./src/js', js);
    gulp.watch('./src/html', html);
    gulp.watch('./src', html);
    // gulp.watch('./src/data', data);
    gulp.watch('./src/static', static);
}
// 把任务导出
exports.css = css;
exports.js = js;
exports.utilsjs = utilsjs;
exports.html = html;
exports.htmls = htmls;
// exports.data = data;
exports.static = static;
exports.clean = clean;
exports.server = server;
exports.watchs = watchs;

// 创建一个总任务 去执行所有的分任务
// 执行其他压缩或者复制之前，应该先清除缓存
// exports.build = gulp.series(clean,css,js,html,data,static);
exports.build = gulp.series(css, clean, gulp.parallel(css, js, utilsjs, html, htmls, static), server, watchs);