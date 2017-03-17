// const path = require('path');
// const sass = require('gulp-sass');
// const minify = require('gulp-minify');
// const uglify = require('gulp-uglify');
// const sourcemaps = require('gulp-sourcemaps');
const browserify = require('browserify');
const babelify = require('babelify');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const watchify = require('watchify');
const gulp = require('gulp');
const gutil = require('gulp-util');
const rename = require('gulp-rename');
const gulpif = require('gulp-if');
const minifyCSS = require('gulp-csso');
const del = require('del');
const imagemin = require('gulp-imagemin');
const browserSync = require('browser-sync').create();
const concat = require('gulp-concat');
const htmlmin = require('gulp-htmlmin');
const autoprefixer = require('gulp-autoprefixer');
const through2 = require('through2').obj;

const env = process.env.NODE_ENV || 'development';
const isProd = env === 'production';
const srcDir = 'public/src';
const distDir = 'public/dist';

gutil.log(gutil.colors.yellow('[Env]'), gutil.colors.blue(env));

/**
 * Error func
 * @param {cb} done
 * @return {cb}
 */
function error(done) {
  return (err) => {
    if (err) {
      browserSync.notify('Error!');
      gutil.log(gutil.colors.red('[Error]'), err);
      done();
    }
  };
}

gulp.task('clean', () => {
  return del([distDir + '/**/*']);
});

gulp.task('assets', () => {
  return gulp.src(srcDir + '/assets/**/*')
    .pipe(imagemin({
      progressive: true,
    }))
    .pipe(gulp.dest(distDir + '/assets'))
    .pipe(browserSync.stream());
});

gulp.task('json', () => {
  return gulp.src(srcDir + '/storage/**/*.json')
    .pipe(gulp.dest(distDir + '/storage'))
    .pipe(browserSync.stream());
});

gulp.task('components', () => {
  return gulp.src(srcDir + '/**/*.component.html')
    .pipe(gulp.dest(distDir + '/views'))
    .pipe(browserSync.stream());
});

gulp.task('css', (done) => {
  return gulp.src([
    'node_modules/bootstrap/dist/css/bootstrap.css',
    srcDir + '/**/*.css',
  ])
    .pipe(autoprefixer())
    .on('error', error(done))
    .pipe(concat('bundle.css'))
    .pipe(gulpif(isProd, rename({ suffix: '.min' })))
    .pipe(gulpif(isProd, minifyCSS()))
    .pipe(gulp.dest(distDir + '/css'))
    .pipe(browserSync.stream());
});

gulp.task('fonts', function () {
  return gulp.src([
    'node_modules/bootstrap/dist/fonts/*.{eot,svg,ttf,woff,woff2}',
  ])
    .pipe(gulp.dest(distDir + '/fonts/'));
});

gulp.task('html', () => {
  return gulp.src(srcDir + '/index.html')
    .pipe(gulpif(isProd, through2((file, encode, cb) => {
      let html = file.contents.toString();
      html = html.replace('href="/css/bundle.css"', 'href="/css/bundle.min.js"');
      html = html.replace('src="/js/bundle.js"', 'src="/js/bundle.min.js"');
      file.contents = Buffer.from(html);
      cb(null, file);
    })))
    .pipe(gulpif(isProd, htmlmin({ collapseWhitespace: true })))
    .pipe(gulp.dest(distDir))
    .pipe(browserSync.stream());
});

gulp.task('js', (done) => {
  return gulp.src([
    'node_modules/jquery/dist/jquery.js',
    'node_modules/bootstrap/dist/js/bootstrap.js',
    'node_modules/angular/angular.js',
    srcDir + '/**/*.js',
  ])
    .on('error', error(done))
    .pipe(concat('bundle.js'))
    .pipe(gulpif(isProd, rename({ suffix: '.min' })))
    // .pipe(gulpif(isProd, uglify({ mangle: false })))
    .pipe(gulp.dest(distDir + '/js'))
    .pipe(browserSync.stream());
});

gulp.task('es6', (done) => {
  let plugin = isProd ? [] : [watchify];
  let options = browserify({
    entries: srcDir + '/index.js',
    extensions: ['.js'],
    plugin,
    debug: !isProd,
  });
  return options.transform(babelify)
    .bundle()
    .on('error', error(done))
    .pipe(source('bundle.js'))
    .pipe(buffer())
    .pipe(gulpif(isProd, rename({ suffix: '.min' })))
    .pipe(gulp.dest(distDir + '/js'))
    .pipe(browserSync.stream({ once: true }));
});

gulp.task('serve', () => {
  browserSync.init({
    // proxy: "yourlocal.dev",
    open: false,
    server: {
      baseDir: distDir,
    },
  });
});

gulp.task('watch', ['es6', 'html', 'css', 'assets', 'fonts', 'json', 'components', 'serve'], () => {
  gulp.watch(srcDir + '/**/*.css', ['css']);
  gulp.watch(srcDir + '/index.html', ['html']);
  gulp.watch(srcDir + '/**/*.component.html', ['components']);
  gulp.watch(srcDir + '/storage/**/*.json', ['json']);
  gulp.watch(srcDir + '/assets/**/*', ['assets']);
  gulp.watch(srcDir + '/**/*.js', ['es6']);
});

gulp.task('default', ['watch']);

if (isProd) {
  gulp.task('default', ['es6', 'css', 'assets', 'fonts', 'html', 'json', 'components']);
} else {
  gulp.task('default', ['watch']);
}
