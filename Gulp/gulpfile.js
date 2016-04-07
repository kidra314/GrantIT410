//this is a gulp file

var gulp  = require('gulp'),
    gutil = require('gulp-util'),
    autoprefixer = require('gulp-autoprefixer'),
    sass   = require('gulp-sass'),
    htmlmin = require('gulp-htmlmin'),
    useref = require('gulp-useref'),
    csso = require('gulp-csso');

const imagemin = require('gulp-imagemin');
const pngquant = require('imagemin-pngquant');

// this just shows that gulp is running
gulp.task('default', function() {
  return gutil.log('Gulp is running!')
});

//this turns SASS into CSS

gulp.task('sassToCSS', function() {
  return gulp.src('./sass/**/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('public/assets/stylesheets'));
});

//this is the autoprefixer

gulp.task('autoPrefix', function () {
	return gulp.src('src/app.css')
		.pipe(autoprefixer({
			browsers: ['last 2 versions'],
			cascade: false
		}))
		.pipe(gulp.dest('dist'));
});

//minifies the CSS

gulp.task('cssMin', function () {
    return gulp.src('./main.css')
        .pipe(csso())
        .pipe(gulp.dest('./out'));
});

gulp.task('development', function () {
    return gulp.src('./main.css')
        .pipe(csso({
            restructure: false,
            sourceMap: true,
            debug: true
        }))
        .pipe(gulp.dest('./out'));
});

//minifies the html
gulp.task('htmlMin', function() {
  return gulp.src('src/*.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('dist'))
});

//minifiaction of images
gulp.task('imageMin', () => {
	return gulp.src('src/images/*')
		.pipe(imagemin({
			progressive: true,
			svgoPlugins: [{removeViewBox: false}],
			use: [pngquant()]
		}))
		.pipe(gulp.dest('dist/images'));
});

//this does the minification for JS
gulp.task('minJS', function() {
  return gulp.src('source/javascript/**/*.js')
    .pipe(sourcemaps.init())
      .pipe(concat('bundle.js'))
      //only uglify if gulp is ran with '--type production'
      .pipe(gutil.env.type === 'production' ? uglify() : gutil.noop())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('public/assets/javascript'));
});

/* updated watch task to include sass */

gulp.task('watchSASS', function() {
  gulp.watch('source/javascript/**/*.js', ['jshint']);
  gulp.watch('source/scss/**/*.scss', ['build-css']);
});

//this is the CSS and JS concatenation
gulp.task('JSandCSS', function () {
    return gulp.src('app/*.html')
        .pipe(useref())
        .pipe(gulp.dest('dist'));
});
