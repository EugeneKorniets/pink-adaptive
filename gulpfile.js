const { series, parallel, src, dest, watch } = require('gulp')
const less                                   = require('gulp-less')
const plumber                                = require('gulp-plumber')
const postcss                                = require('gulp-postcss')
const autoprefixer                           = require('autoprefixer')
const minify                                 = require('gulp-csso')
const rename                                 = require('gulp-rename')
const uglify                                 = require('gulp-uglify')
const browserSync                            = require('browser-sync')
const del                                    = require('del')


function clean () {
	return del('build')
}

function copy () {
	return src([
		'app/fonts/**/*.{woff,woff2}',
		'app/img/**'
		], {
			base: 'app'
	})
	.pipe(dest('build'))
}

function html () {
	return src('app/*.html')
	.pipe(dest('build'))
}

function style () {
	return src('app/less/style.less')
	.pipe(plumber())
	.pipe(less())
	.pipe(postcss([
		autoprefixer({
			browsers:['ie >= 11', 'last 4 version']
		})
		]))
	.pipe(dest('build/css'))
	.pipe(minify())
	.pipe(rename('style.min.css'))
	.pipe(dest('app/css'))
	.pipe(dest('build/css'))
}

function js () {
	return src('app/js/script.js')
	.pipe(plumber())
	.pipe(dest('build/js'))
	.pipe(uglify())
	.pipe(rename('script.min.js'))
	.pipe(dest('app/js'))
	.pipe(dest('build/js'))
}

function startDevServer () {
	browserSync({
		server: {
			baseDir: 'build'
		},
		notify: false
	})
	watch('app/less/**/*.less', series(style, reloadBrowser))
	watch('app/*.html', series(html, reloadBrowser))
	watch('app/js/**/*.js', series(js, reloadBrowser))
}

async function reloadBrowser () {
	await browserSync.reload()
}

exports.build = series(
	clean,
	parallel(copy, html, style, js)
)

exports.default = series(
	clean,
	parallel(copy, html, style, js),
	startDevServer
)