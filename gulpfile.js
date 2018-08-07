'use strict';

var gulp = require('gulp');
var del = require('del');
var htmlmin = require('gulp-htmlmin');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var cssmin = require('gulp-csso');
var browserSync = require('browser-sync').create();

gulp.task('clean', function () {
  return del('docs');
});

gulp.task('copy', function () {
  return gulp.src('assets/**/*.{woff,woff2,png,jpg}', {base: './assets/'})
    .pipe(gulp.dest('docs'));
});

gulp.task('html', function() {
  return gulp.src('assets/*.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('docs'));
});

gulp.task('style', function () {
  return gulp.src('assets/style.css')
    .pipe(postcss([ autoprefixer({grid: true}) ]))
    .pipe(cssmin())
    .pipe(gulp.dest('docs'));
});

gulp.task('dev', function() {
  browserSync.init({
    server: 'docs'
  });
  gulp.watch('assets/**/*.css', gulp.series('style'));
  gulp.watch('assets/*.html', gulp.series('html'));
  browserSync.watch('./**/*.*').on('change', browserSync.reload);
});

gulp.task('build',
  gulp.series('clean',
  gulp.parallel('copy', 'html', 'style')
  )
);

gulp.task('default',
  gulp.series('build', 'dev')
);
