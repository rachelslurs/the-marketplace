var gulp = require('gulp');
var config = require('../config').bootstrap;

gulp.task('bootstrap-sass', function() {
	return gulp.src(config.styles.src).pipe(gulp.dest(config.styles.dest));
});
gulp.task('bootstrap-fonts', function() {
	return gulp.src(config.fonts.src).pipe(gulp.dest(config.fonts.dest));
});

gulp.task('bootstrap', ['bootstrap-sass', 'bootstrap-fonts']);
