"use strict";

const gulp = require("gulp");
const sass = require("gulp-sass");
const browsersync = require("browser-sync").create();

// BrowserSync
function browserSync(cb) {
  browsersync.init({
    server: {
      baseDir: "./"
    },
    port: 3000
  });
  cb();
}

// HTML
function html() {
  return gulp
    .src('./*.html')
    .pipe(browsersync.stream());
}

// JS
function scr() {
  return gulp
    .src('./src/*.js')
    .pipe(browsersync.stream());
}

// CSS
function css() {
  return gulp
    .src("./src/scss/**/*.scss")
    .pipe(sass({ outputStyle: "expanded" }))
    .pipe(gulp.dest("./src/"))
    .pipe(browsersync.stream());
}

// Watch files
function watchFiles() {
  gulp.watch("./*", html);
  gulp.watch("./src/scss/*", css);
  gulp.watch("./src/*", scr);
}

const watch = gulp.parallel(watchFiles, browserSync);

// Export tasks!
exports.html = html;
exports.css = css;
exports.scr = scr;
exports.default = watch;
