let gulp        = require('gulp');
let	sass        = require('gulp-sass');
let exec        = require('child_process').exec;
let	browserSync = require('browser-sync').create();

let	path = {
	html: ['**/*.html', 'src/js/**/*.js'],
	sass: ['src/scss/**/*.scss']
};

gulp.task('git-add', ['sass'], function (cb) {
	exec('git add .', function (err, stdout, stderr) {
		console.log(stdout);
		console.log(stderr);

		exec('git commit -m "update"', function (err, stdout, stderr) {
			console.log(stdout);
			console.log(stderr);

			exec('git push -u origin master', function (err, stdout, stderr) {
				console.log(stdout);
				console.log(stderr);
				cb(err);
			});
		});
	});
});

gulp.task('sass', () => {
	return gulp.src(path.sass)
	// {outputStyle: 'compressed'}
		.pipe(sass().on('error', sass.logError))
		.pipe(gulp.dest('src/css/'));
});

gulp.task('browser-sync', () => {
	browserSync.init({
		server: {
			baseDir: './'
		}
	});
});

gulp.task('reload', ['git-add'], () => { //, ['git-add']
	browserSync.reload();
});

gulp.task('watch', ['sass'], () => {
	gulp.watch([path.html, path.sass], ['reload']);
});

gulp.task('default', ['browser-sync', 'watch']);