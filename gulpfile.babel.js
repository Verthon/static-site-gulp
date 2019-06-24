const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const rename = require('gulp-rename');
const sourcemaps = require('gulp-sourcemaps');
const concat = require('gulp-concat');

const browserify = require('browserify');
const babel = require('gulp-babel');
const source = require('vinyl-source-stream');
const uglify = require('gulp-uglify');
const buffer = require('vinyl-buffer');
const browserSync = require('browser-sync').create();
const reload = browserSync.reload;

const htmlWatch = '**/*.html';
const styleSrc = 'src/scss/style.scss';
const styleDist = './dist/css/';
const styleWatch = 'src/scss/**/*.scss';

const jsSrc = 'main.js';
const jsFolder = 'src/js/';
const jsDist = './dist/js/';
const jsWatch = 'src/js/**/*.js';
const jsFiles = [jsSrc];

const paths = {
  styles: {
    src: 'src/scss/**/*.scss',
    dest: 'dist/css',
  },

  scripts: {
    src: 'src/js/**/*.js',
    dest: 'dist/js',
  },
};

function styles() {
  return src(paths.styles.src)
    .pipe(sourcemaps.init())
    .pipe(sass())
    .on('error', sass.logError)
    .pipe(postcss([autoprefixer(), cssnano()]))
    .pipe(sourcemaps.write('.'))
    .pipe(dest(paths.styles.dest))
    .pipe(browserSync.stream());
}

function scripts() {
  return gulp
    .src(paths.scripts.src, { sourcemaps: true })
    .pipe(babel({ presets: ['@babel/preset-env'] }))
    .pipe(uglify())
    .pipe(concat('main.min.js'))
    .pipe(gulp.dest(paths.scripts.dest))
    .pipe(browserSync.stream());
}

function watch() {
  browserSync.init({
    server: {
      baseDir: './',
    },
  });

  gulp.watch('src/scss/**/*.scss', styles);
  gulp.watch('src/js/**/*.js', scripts);
  gulp.watch('./*.html').on('change', browserSync.reload);
}

// gulp.task('browser-sync', () => {
//   browsersync.init({
//     server: {
//       injectChanges: true,
//       baseDir: './',
//     },
//   });
// });

// gulp.task('style', () => {
//   gulp
//     .src(styleSrc)
//     .pipe(sourcemaps.init())
//     //return gulp.src(styleSrc)
//     .pipe(sass().on('error', sass.logError))
//     .pipe(
//       autoprefixer({
//         browsers: ['last 2 versions'],
//         cascade: false,
//       })
//     )
//     .pipe(rename({ suffix: '.min' }))
//     .pipe(sourcemaps.write('./'))
//     .pipe(gulp.dest(styleDist))
//     .pipe(browsersync.stream());
// });

// gulp.task('js', () => {
//   jsFiles.map(entry => {
//     return browserify({
//       entries: [jsFolder + entry],
//     })
//       .transform(babelify, { presets: ['env'] })
//       .bundle()
//       .pipe(source(entry))
//       .pipe(rename({ extname: '.min.js' }))
//       .pipe(buffer())
//       .pipe(sourcemaps.init({ loadMaps: true }))
//       .pipe(uglify())
//       .pipe(sourcemaps.write('./'))
//       .pipe(gulp.dest(jsDist))
//       .pipe(browsersync.stream());
//   });
// });

// gulp.task('html', () => {
//   gulp.src(htmlSource).pipe(browsersync.stream());
// });

// gulp.task('default', ['style', 'js']);

// gulp.task('watch', ['default', 'browser-sync'], () => {
//   gulp.watch(styleWatch, ['style', reload]);
//   gulp.watch(jsWatch, ['js', reload]);
//   gulp.watch(htmlWatch, reload);
// });

exports.watch = watch;
