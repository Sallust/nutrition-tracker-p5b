'use strict';

var gulp = require('gulp');

var inline = require('gulp-inline');
var uglify = require('gulp-uglify');
var minifyCss = require('gulp-minify-css');

var htmlmin = require('gulp-htmlmin');
var jshint = require('gulp-jshint');

var del = require('del');
var browserSync = require("browser-sync");



gulp.task('optimize-stack', function() {
	gulp.src('src/index.html')
	.pipe(inline({
		js: uglify,
		css:minifyCss,
		disabledTypes: ['svg','img'],
		ignore: ['js/lib/knockout-3.4.0.js', 'src/css/lib', 'js/analytics.js']
	}))
	.pipe(htmlmin({
		collapseWhitespace: true,
	}))
	.pipe(gulp.dest('dist'));
})

gulp.task('inline', function() {
	gulp.src('src/index.html')
	.pipe(inline({
		js: uglify,
		css:minifyCss,
		disabledTypes: ['svg','img'],
		ignore: ['src/js/lib/knockout-3.4.0.js', 'src/css/lib']
	}))
	.pipe(gulp.dest('dist'))
})

gulp.task('minify-html', function() {
	gulp.src('src/index.html')
	.pipe(htmlmin({
		collapseWhitespace: true,
		removeComments: true
	}))
	.pipe(gulp.dest('dist'));
})

gulp.task('lint', function() {
    return gulp.src(['src/js/collections/*.js', 'src/js/d3/*.js', 'src/js/models/*.js','src/js/views/*.js'])
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

gulp.task('watch', function() {
    gulp.watch('src/index.html', ['optimize-stack']);
});

gulp.task('default', ['lint', 'optimize-stack', 'watch']);

gulp.task('brow-sync', function() {
	browserSync.init({
		server:{
			baseDir: "./dist"
		},
		socket: {
			domain: 'http://localhost:3000'
		},
		files: ['./src/index.html', './src/css/*.css']
	});
	//gulp.watch()
});

