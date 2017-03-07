var gulp = require('gulp');
var config = require('../config').bootstrap;

gulp.task('bootstrap-sass', function() {
	return gulp.src(config.styles.src).pipe(gulp.dest(config.styles.dest));
});

gulp.task('bootstrap', ['bootstrap-sass']);
