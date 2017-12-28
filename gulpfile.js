var gulp         = require('gulp');
var less         = require('gulp-less');
var plumber      = require('gulp-plumber');
var postcss      = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var browserSync  = require('browser-sync');
var del          = require('del');
var minify       = require('gulp-csso');
var rename       = require('gulp-rename');
var run          = require('run-sequence');
var uglify       = require('gulp-uglify');


gulp.task('clean', function() {
	return del('build');
});


gulp.task('copy', function() {
	return gulp.src([
		'app/fonts/**/*.{woff,woff2}',
		'app/img/**'
		], {
			base: 'app'
	})
	.pipe(gulp.dest('build'));
});


gulp.task('html', function() {
	return gulp.src('app/*.html')
	.pipe(gulp.dest('build'));
});


gulp.task('style', function() {
	return gulp.src('app/less/style.less')
	.pipe(plumber())
	.pipe(less())
	.pipe(postcss([
		autoprefixer({
			browsers:['ie >= 11', 'last 4 version']
		})
		]))
	.pipe(gulp.dest('build/css'))
	.pipe(minify())
	.pipe(rename('style.min.css'))
	.pipe(gulp.dest('app/css'))
	.pipe(gulp.dest('build/css'));
});


gulp.task('js', function() {
	return gulp.src('app/js/script.js')
	.pipe(plumber())
	.pipe(gulp.dest('build/js'))
	.pipe(uglify())
	.pipe(rename('script.min.js'))
	.pipe(gulp.dest('app/js'))
	.pipe(gulp.dest('build/js'));
});


gulp.task('build', function(done) {
	run (
		'clean',
		'copy',
		'html',
		'style',
		'js',
		done
		);
});


gulp.task('default', ['build'], function() {
	browserSync({
		server: {
			baseDir: 'build'
		},
		notify: false
	});
	gulp.watch('app/less/**/*.less', ['style', browserSync.reload]);
	gulp.watch('app/*.html', ['html', browserSync.reload]);
	gulp.watch('app/js/**/*.js', ['js', browserSync.reload]);
});