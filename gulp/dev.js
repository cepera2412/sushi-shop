const gulp = require('gulp')
const fileInclude = require('gulp-file-include')
const sass = require('gulp-sass')(require('sass'))
const sassGlob = require('gulp-sass-glob')
const server = require('gulp-server-livereload')
const clean = require('gulp-clean')
const fs = require('fs')
const sourceMaps = require('gulp-sourcemaps')
const plumber = require('gulp-plumber')
const notify = require('gulp-notify')
const webpack = require('webpack-stream')
const changed = require('gulp-changed')

gulp.task('clean:dev', function (done) {
	if (fs.existsSync('./build/')) {
		return gulp.src('./build/', { read: false }).pipe(clean({ force: true }))
	}
	done()
})

const fileIncludeSetting = {
	prefix: '@@',
	basepath: '@file',
}

const plumberNotify = title => {
	return {
		errorHandler: notify.onError({
			title: title,
			message: 'Error <%= error.message %>',
			sound: false,
		}),
	}
}

gulp.task('html:dev', function () {
	return gulp
		.src(['./app/html/**/*.html', '!./app/html/components/**/*.html'])
		.pipe(changed('./build/', { hasChanged: changed.compareContents }))
		.pipe(plumber(plumberNotify('HTML')))
		.pipe(fileInclude(fileIncludeSetting))
		.pipe(gulp.dest('./build/'))
})

gulp.task('scss:dev', function () {
	return gulp
		.src('./app/scss/*.scss')
		.pipe(changed('./build/css/'))
		.pipe(plumber(plumberNotify('SCSS')))
		.pipe(sourceMaps.init())
		.pipe(sassGlob())
		.pipe(sass())
		.pipe(sourceMaps.write())
		.pipe(gulp.dest('./build/css/'))
})

gulp.task('images:dev', function () {
	return gulp
		.src('./app/img/**/*')
		.pipe(changed('./build/img/'))
		.pipe(gulp.dest('./build/img/'))
})

gulp.task('data:dev', function () {
	return gulp
		.src('./app/data/*.json')
		.pipe(changed('./build/data/'))
		.pipe(gulp.dest('./build/data/'))
})

gulp.task('fonts:dev', function () {
	return gulp
		.src('./app/fonts/**/*')
		.pipe(changed('./build/fonts/'))
		.pipe(gulp.dest('./build/fonts/'))
})

gulp.task('files:dev', function () {
	return gulp
		.src('./app/files/**/*')
		.pipe(changed('./build/files/'))
		.pipe(gulp.dest('./build/files/'))
})

gulp.task('js:dev', function () {
	return gulp
		.src('./app/js/*.js')
		.pipe(changed('./build/js/'))
		.pipe(plumber(plumberNotify('JS')))
		.pipe(webpack(require('./../webpack.config.js')))
		.pipe(gulp.dest('./build/js/'))
})

const serverOptions = {
	livereload: true,
	open: true,
}

gulp.task('server:dev', function () {
	return gulp.src('./build/').pipe(server(serverOptions))
})

gulp.task('watch:dev', function () {
	gulp.watch('./app/scss/**/*.scss', gulp.parallel('scss:dev'))
	gulp.watch('./app/html/**/*.html', gulp.parallel('html:dev'))
	gulp.watch('./app/data/**/*.json', gulp.parallel('data:dev'))
	gulp.watch('./app/img/**/*', gulp.parallel('images:dev'))
	gulp.watch('./app/fonts/**/*', gulp.parallel('fonts:dev'))
	gulp.watch('./app/files/**/*', gulp.parallel('files:dev'))
	gulp.watch('./app/js/**/*.js', gulp.parallel('js:dev'))
})
