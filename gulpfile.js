//import { rename } from 'fs';

const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const rename = require('gulp-rename');
const sourcemaps = require('gulp-sourcemaps');

const browserify = require('browserify');
const babelify = require('babelify');
const source = require('vinyl-source-stream');
const uglify = require('gulp-uglify');
const buffer = require('vinyl-buffer');


const styleSrc = 'src/scss/style.scss';
const styleDist = './dist/css/';
const styleWatch = 'src/scss/**/*.scss';

const jsSrc = 'main.js';
const jsFolder ="src/js";
const jsDist = './dist/js/';
const jsWatch = 'src/js/**/*.js';
const jsFiles = [jsSrc];



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
 jsFiles.map((entry) => {

  return browserify({
    entries: [jsFolder + entry]    
  })
  .transform(babelify, {presets: ['env']})
  .bundle()
  .pipe(source(entry))
  .pipe(rename({extname: '.min.js'}))
  .pipe(buffer())
  .pipe(sourcemaps.init({loadMaps: true}))
  .pipe(uglify())
  .pipe(sourcemaps.write('./'))
  .pipe(gulp.dest(jsDist));
 });
});

gulp.task('default', ['style', 'js']);

gulp.task('watch', ['default'], () => {
  gulp.watch(styleWatch, ['style']);
  gulp.watch(jsWatch, ['js']);
});
