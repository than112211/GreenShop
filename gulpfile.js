const { src, dest, parallel, watch, series } = require('gulp'),
concat = require('gulp-concat'),
sass = require('gulp-sass'),
pug = require('gulp-pug'),
browserSync =require('browser-sync').create()

const FilesPath = { sassFiles: 'E:/VSCODE/GreenShop/src/sass/style.scss', htmlFiles: 'E:/VSCODE/GreenShop/src/pug/pages/*.pug' }
function sassTask() { return src(FilesPath.sassFiles) .pipe(sass()) .pipe(concat('style.css')).pipe(dest('E:/VSCODE/GreenShop/assets/css')) .pipe(browserSync.stream()); }
function htmlTask() { return src(FilesPath.htmlFiles) .pipe(pug({ pretty: true })).pipe(dest('E:/VSCODE/GreenShop')) .pipe(browserSync.stream()); }
function serve() { browserSync.init({ server: { baseDir: 'E:/VSCODE/GreenShop' } })
watch(sassFiles,sassTask);
watch(htmlFiles, htmlTask); }
exports.sass = sassTask;
exports.html = htmlTask;
exports.default = series(parallel(htmlTask, sassTask));
exports.serve = series(serve, parallel(htmlTask, sassTask))