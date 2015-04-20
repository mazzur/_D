var gulp = require('gulp'),
    browserSync = require('browser-sync');

gulp.task('default', ['test','watch']);

gulp.task('test', function() {
    browserSync({
        server: './test'
    });
});

gulp.task('watch', function(){
    gulp.watch('./test/**')
        .on('change', function () {
            setTimeout(function(){
                browserSync.reload();
            }, 100);
        });
});