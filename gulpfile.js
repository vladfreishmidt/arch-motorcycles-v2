var gulp = require('gulp');
var sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
sass.compiler = require('node-sass');
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;
var cleanCSS = require('gulp-clean-css');
var sourcemaps = require('gulp-sourcemaps');


// Task for SASS
gulp.task('sass', function () {
  return gulp.src('./src/scss/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
            browsers: ['last 2 versions']
    }))
    .pipe(gulp.dest('./public/css'))
    .pipe(browserSync.stream())
});


// Task for browser-sync
gulp.task('browser-sync', function() {
  browserSync.init({
    server: './public',
    notify: false,
    open: false
  })
});


// Task for minify-sass
gulp.task('sass:minify', function () {
  return gulp.src('./public/css/*.css')
    .pipe(sourcemaps.init())
    .pipe(cleanCSS())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./public/css'))
});


// Default
gulp.task('default', ['sass', 'browser-sync'], function() {
  gulp.watch('./src/scss/**/*', ['sass'])
})


//Production
gulp.task('production', ['sass:minify'])
