var dest = './build',
	src = './src',
	node_modules = './node_modules',
	docs = './docs';

module.exports = {
	browserSync: {
		server: {
			baseDir: [dest, src]
		},
		files: [dest + '/**']
	},
	images: {
		src: src + '/img/*',
		dest: dest + '/assets/img'
	},
	bootstrap: {
		styles: {
			src: node_modules + '/bootstrap-sass/assets/stylesheets/bootstrap/**/*',
			dest: src + '/sass/bootstrap'
		},
		fonts: {
			src: node_modules + '/bootstrap-sass/assets/fonts/bootstrap/*',
			dest: dest + '/assets/fonts/bootstrap'
		}
	},
	sass: {
		src: src + '/sass/main.scss',
		watch: [src + '/sass/**'],
		dest: dest + '/assets/css'
	},
	markup: {
		src: src + "/*.html",
		dest: dest
	},
	browserify: {
		// Enable source maps
		debug: true,
		// A separate bundle will be generated for each
		// bundle config in the list below
		bundleConfigs: [
			{
				entries: src + '/app/app.jsx',
				dest: dest,
				outputName: 'app.js'
			}
		]
	}
};
