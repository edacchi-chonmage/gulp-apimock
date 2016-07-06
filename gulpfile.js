var gulp = require('gulp');
var babel = require('gulp-babel');
var watch = require('gulp-watch');
var plumber = require('gulp-plumber');
var built = require('./built/index.js');

gulp.task('default', function () {
  gulp.run('watch');
});

gulp.task('build', function () {
  gulp.src([
    'src/**/*.js'
  ])
    .pipe(plumber())
    .pipe(babel({
      presets: [
        'stage-0',
        'es2015'
      ]
    }))
    .pipe(gulp.dest('built'))
  ;
});

gulp.task('test', function () {
  gulp.src([
    'built/index.md'
  ])
    .pipe(built())
  ;
});

gulp.task('watch', function () {
  gulp.run('build');

  watch([
    'src/**/*.js'
  ], function () {
    gulp.run('build');
  });
});

gulp.task('watch:test', function () {
  gulp.run('test');

  watch([
    'built/index.js',
    'built/index.md'
  ], function () {
    built.rerun();
  });
});
