//import { rename } from 'fs';

const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const rename = require('gulp-rename');
const sourcemaps = require('gulp-sourcemaps');

const styleSrc = 'src/scss/style.scss';
const styleDist = './dist/css/';
const styleWatch = 'src/scss/**/*.scss';

const jsSrc = 'src/js/main.js';
const jsDist = './dist/js/';
const jsWatch = 'src/js/**/*.js';


gulp.task('style', () => {
  gulp.src(styleSrc)
      .pipe(sourcemaps.init())
      //return gulp.src(styleSrc)
      .pipe(sass()
      .on('error', sass.logError))     
      .pipe(autoprefixer({
        browsers: ['last 2 versions'],
        cascade: false
      }))
      .pipe(rename({suffix: '.min'}))
      .pipe(sourcemaps.write('./'))
      .pipe(gulp.dest(styleDist));
});

gulp.task('js', () =>{
  gulp.src(jsSrc)
    .pipe(gulp.dest(jsDist));
});

gulp.task('default', ['style', 'js']);

gulp.task('watch', ['default'], () => {
  gulp.watch(styleWatch, ['style']);
  gulp.watch(jsWatch, ['js']);
});
