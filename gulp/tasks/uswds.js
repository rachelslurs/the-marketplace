var gulp = require('gulp');
var config = require('../config').uswds;

gulp.task('styles', function() {
	return gulp.src(config.styles.src).pipe(gulp.dest(config.styles.dest));
});

gulp.task('fonts', function() {
	return gulp.src(config.fonts.src).pipe(gulp.dest(config.fonts.dest));
});

gulp.task('imgs', function() {
	return gulp.src(config.images.src).pipe(gulp.dest(config.images.dest));
});

// might not need this
gulp.task('javascript', function() {
	return gulp.src(config.javascript.src).pipe(gulp.dest(config.javascript.dest));
});

gulp.task('uswds', ['styles', 'fonts', 'imgs']);
