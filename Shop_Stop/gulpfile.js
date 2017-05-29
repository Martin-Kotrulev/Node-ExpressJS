const gulp = require('gulp')
const minifyCss = require('gulp-clean-css')
const rename = require('gulp-rename')
const htmlmin = require('gulp-htmlmin')

gulp.task('minify-css', () => {
  gulp.src('content/styles/*.css')
    .pipe(minifyCss())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('content/styles'))
})

gulp.task('minify-html', () => {
  let collapse = {collapseWhitespace: true}
  let suffix = {suffix: '.min'}

  gulp.src('views/home/*.html')
    .pipe(htmlmin(collapse))
    .pipe(rename(suffix))
    .pipe(gulp.dest('views/home/'))

  gulp.src('views/images/*.html')
    .pipe(htmlmin(collapse))
    .pipe(rename(suffix))
    .pipe(gulp.dest('views/images/'))

  gulp.src('products/*.html')
    .pipe(htmlmin(collapse))
    .pipe(rename(suffix))
    .pipe(gulp.dest('products/'))
})
