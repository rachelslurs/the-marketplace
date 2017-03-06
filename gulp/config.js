var dest = './build',
    src = './src',
    node_modules = './node_modules';

module.exports = {
    browserSync: {
        server: {
            baseDir: [dest, src]
        },
        files: [
            dest + '/**'
        ]
    },
    uswds: {
      styles: {
        src: node_modules + '/uswds/src/stylesheets/**/*',
        dest: src + '/sass/uswds'
      },
      fonts: {
        src: node_modules + '/uswds/src/fonts/**/*',
        dest: dest + '/assets/fonts'
      }
    },
    sass: {
        src: src + '/sass/main.scss',
        watch: [
            src + '/sass/**'
        ],
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
        bundleConfigs: [{
            entries: src + '/app/app.jsx',
            dest: dest,
            outputName: 'app.js'
        }]
    }
};