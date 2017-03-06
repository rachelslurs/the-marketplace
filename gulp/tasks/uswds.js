var gulp = require('gulp');
var config = require('../config').uswds;

gulp.task('styles', function () {
  return gulp.src(config.styles.src)
    .pipe(gulp.dest(config.styles.dest));
});

gulp.task('fonts', function () {
  return gulp.src(config.fonts.src)
    .pipe(gulp.dest(config.fonts.dest));
});

gulp.task('uswds', ['styles', 'fonts']);
