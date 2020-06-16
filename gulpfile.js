'use strict';

/**
 * Setup
 */
var gulp      = require('gulp');
var sass      = require('gulp-sass');
sass.compiler = require('dart-sass');
var plugins   = require('gulp-load-plugins')({
    rename: {
        'gulp-append-prepend': 'gap',
        'gulp-notify': 'notify'
    }
});

/**
 * Config
 */
var notify_config = {
    title: 'Portfolio',
    onLast: true
};

var paths = {
    sass: {
        source: [
            'assets/scss/**/*.scss'
        ],
        dest: 'assets/css/'
    },
    jquery: {
        source: [
            'assets/js/jquery.js'
        ],
        dest: 'assets/js/',
        prepend_files: [
            'node_modules/jquery/dist/jquery.min.js'
        ]
    },
    js: {
        source: [
            'assets/js/app.js'
        ],
        dest: 'assets/js/',
        prepend_files: [
            'node_modules/jcf/dist/js/jcf.js',
            'node_modules/jcf/dist/js/jcf.select.js',
            'node_modules/jcf/dist/js/jcf.checkbox.js',
            'node_modules/jcf/dist/js/jcf.radio.js',
            'node_modules/jcf/dist/js/jcf.number.js',
            'node_modules/jcf/dist/js/jcf.file.js',
            'node_modules/jcf/dist/js/jcf.range.js',
            'node_modules/vanilla-fitvids/jquery.fitvids.js',
            'node_modules/picturefill/dist/picturefill.js',
            'node_modules/jquery-validation/dist/jquery.validate.js',
            'assets/js/jquery.custom.js'
        ]
    }
};

/**
 * Sass
 */
gulp.task('compile:styles', function () {
    return gulp.src(paths['sass']['source'])
        .pipe(sass({
            outputStyle: 'compressed'
        })
            .on("error", plugins.notify.onError({
                title: 'Sass Error',
                onLast: notify_config['onLast'],
                message: "<%= error.message %>"
            }))
        )
        .pipe(plugins.autoprefixer({
            Browserslist: ['>0.2%, last 2 versions, Firefox ESR, not dead']
        }))
        .pipe(plugins.rename({
            suffix: ".min",
            extname: ".css"
        }))
        .pipe(gulp.dest(paths['sass']['dest']))
        .pipe(plugins.notify({
            title: notify_config['title'],
            onLast: notify_config['onLast'],
            message: "CSS compiled successfully"
        }));
});

/**
 * JavaScript
 */
//---- jQuery
gulp.task('compile:jquery', function () {
    return gulp.src(paths['jquery']['source'])
        .pipe(plugins.gap.prependFile(paths['jquery']['prepend_files']))
        .pipe(plugins.rename({
            suffix: ".min",
            extname: ".js"
        }))
        .pipe(gulp.dest(paths['jquery']['dest']))
        .pipe(plugins.notify({
            title: notify_config['title'],
            onLast: notify_config['onLast'],
            message: "jQuery compiled successfully"
        }));
});

//---- App
gulp.task('compile:js', function () {
    return gulp.src(paths['js']['source'])
        .pipe(plugins.gap.prependFile(paths['js']['prepend_files']))
        .pipe(plugins.terser()
            .on("error", plugins.notify.onError({
                title: 'Terser Error',
                onLast: notify_config['onLast'],
                message: "<%= error.message %>"
            }))
        )
        .pipe(plugins.rename({
            suffix: ".min",
            extname: ".js"
        }))
        .pipe(gulp.dest(paths['js']['dest']))
        .pipe(plugins.notify({
            title: notify_config['title'],
            onLast: notify_config['onLast'],
            message: "JS compiled successfully"
        }));
});

/**
 * Build project
 */
gulp.task('build', gulp.parallel('compile:styles', 'compile:jquery', 'compile:js'));

/**
 * Watch project
 */
gulp.task('watch', function () {
    gulp.watch(paths['sass']['source'], gulp.series('compile:styles'));
    gulp.watch(paths['js']['prepend_files'], gulp.series('compile:styles'));
});
