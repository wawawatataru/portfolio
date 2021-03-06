var gulp = require("gulp");
var plumber = require('gulp-plumber');
var compass = require('gulp-compass');
var cssmin = require('gulp-cssmin');
var pug = require('gulp-pug');
var browserSync = require('browser-sync').create();

gulp.task('pug', function (done) {
  gulp.src(['./src/pug/*.pug', '!./src/pug/_*.pug'])
    .pipe(plumber())
    .pipe(pug({
      pretty: true,
      basedir: './src/pug'
    }))
    .pipe(gulp.dest('./docs'));
  done();
});

gulp.task('compass', function (done) {
  gulp.src('src/scss/*.scss')
    .pipe(plumber())
    .pipe(compass({
      config_file: 'config.rb',
      comments: false,
      css: 'docs/css',
      sass: 'src/scss/'
    }))
    .pipe(cssmin())
    .pipe(gulp.dest('docs/css'));
  done();
});

gulp.task('build-server', function (done) {
  browserSync.init({
    server: {
      baseDir: "./docs",
      index: "index.html"
    }
  });
  done();
});

gulp.task('watch-files', function (done) {
  gulp.watch("src/pug/*.pug", gulp.task('pug'));
  gulp.watch("src/scss/*.scss", gulp.task('compass'));
  gulp.watch("docs/css/*.css", gulp.task('browser-reload'));
  gulp.watch("docs/*.docs", gulp.task('browser-reload'));
  done();
});

gulp.task('browser-reload', function (done) {
  browserSync.reload();
  done();
});

gulp.task('default', gulp.series('build-server', 'watch-files', 'compass', 'pug', function (done) {
  done();
}));