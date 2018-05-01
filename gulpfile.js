//import { rename } from 'fs';

const gulp = require('gulp');
const rename = require('gulp-rename');
const styleSrc = './src/scss/style.scss';
const styleDist = './dist/css/';

gulp.task('styles', ()=> {
  gulp.src(styleSrc)
      .pipe(rename({suffix: '.min'}))
      .pipe(gulp.dest(styleDist));
});