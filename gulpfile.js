//import { rename } from 'fs';

const gulp = require('gulp');
const gulpSass = require('gulp-sass');
const rename = require('gulp-rename');
const styleSrc = './src/scss/style.scss';
const styleDist = './dist/css/';

gulp.task('styles', ()=> {
  gulp.src(styleSrc)
      .pipe(sass({
        errorLogToConsole: true
      }))
      .pipe(rename({suffix: '.min'}))
      .pipe(gulp.dest(styleDist));
});