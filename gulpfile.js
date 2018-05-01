//import { rename } from 'fs';

const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const rename = require('gulp-rename');
const styleSrc = './src/scss/style.scss';
const styleDist = './dist/css/';

gulp.task('styles', () => {
  gulp.src(styleSrc)
      .pipe(sass({
        errorLogToConsole: true,
        outputStyle: 'compressed'
      }))
      .on('error', console.error.bind( console))
      .pipe(autoprefixer({
        browsers: ['last 2 versions'],
        cascade: false
      }))
      .pipe(rename({suffix: '.min'}))
      .pipe(gulp.dest(styleDist));
});