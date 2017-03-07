var gulp = require('gulp');
var runSequence = require('run-sequence');
var del = require('del');

gulp.task('clean', function() {
	return del('build/');
});

gulp.task('build', function(done) {
	runSequence('clean', [
		'browserify', 'markup', 'bootstrap', 'sass'
	], done);
});
