const gulp = require('gulp');
const ts = require('gulp-typescript');
const merge = require('merge2');
const copy = require('gulp-copy');

const tsProject = ts.createProject('tsconfig.json', {
  declaration: true
});

gulp.task('html-copy', function () {
  return gulp.src('electron/**/*.html').pipe(copy('build', {prefix: 1}));
});

gulp.task('typescript', function () {
  let tsResult = gulp.src('electron/**/*.ts').pipe(tsProject());

  return merge([
    tsResult.dts.pipe(gulp.dest('build')),
    tsResult.js.pipe(gulp.dest('build'))
  ]);
});

gulp.task('watch', ['typescript', 'html-copy'], function () {
  gulp.watch('electron/**/*.ts', ['typescript']);
  gulp.watch('electron/**/*.html', ['html-copy']);
});