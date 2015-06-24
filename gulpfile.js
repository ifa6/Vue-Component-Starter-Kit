

'use strict';

// Include Gulp & Tools We'll Use
var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var del = require('del');
var runSequence = require('run-sequence');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var gutil = require("gulp-util");
var webpack = require("webpack");
var webpackConfig = require("./webpack.config.js");
var inject = require("gulp-inject");
var sass = require('gulp-ruby-sass');
var notify = require('gulp-notify');
var svgSprite = require('gulp-svg-sprite');
var handleErrors  = function() {

    var args = Array.prototype.slice.call(arguments);

    // Send error to notification center with gulp-notify
    notify.onError({
        title: "Compile Error",
        message: "<%= error.message %>"
    }).apply(this, args);

    // Keep gulp from hanging on this task
    this.emit('end');
};

// Lint JavaScript
gulp.task('jshint', function () {
    return gulp.src(['app/src/**/*.js'])
        .pipe(reload({stream: true, once: true}))
        .pipe($.jshint())
        .pipe($.jshint.reporter('jshint-stylish'))
        .pipe($.if(!browserSync.active, $.jshint.reporter('fail')));
});

//Inject Sprite
gulp.task('inject:sprite', function () {
    var target = gulp.src('./app/src/components/uti/sprite/sprite.vue');


    return target.pipe(inject(gulp.src(['./app/src/images/symbol/svg/sprite.symbol.svg']), {
            starttag: '<!-- inject:svg -->',
            transform: function (filePath, file) {
                // return file contents as string
                return file.contents.toString('utf8')
            }
        }))
        .pipe(gulp.dest('./app/src/components/uti/sprite/'));
});

gulp.task('webpack:watch',['styles'], function(cb) {
// modify some webpack config options
    var myConfig = Object.create(webpackConfig);
    myConfig.devtool = "sourcemap";
    myConfig.debug = true;

    var compiler = webpack(myConfig);
    compiler.watch(/* watchDelay= */200, function(err, stats) {
        if(err) throw new gutil.PluginError("webpack", err);
        gutil.log("[webpack]", stats.toString({
            colors: true,
            progress: true
        }));

    });
    return cb();
});

// Clean Output Directory
gulp.task('clean:build', del.bind(null, [ 'app/build/*'], {dot: true}));
// Clean Built CSS
gulp.task('clean:css', del.bind(null, [ 'app/src/components/**/*.css'], {dot: true}));

//Clean task
gulp.task('clean', [ 'clean:build', 'clean:css']);



// Watch Files For Changes & Reload
gulp.task('default',['webpack:watch'], function () {
    browserSync({
        notify: false,
        // Customize the BrowserSync console logging prefix
        logPrefix: 'VUE',
        // Run as an https by uncommenting 'https: true'
        // Note: this uses an unsigned certificate which on first access
        //       will present a certificate warning in the browser.
        // https: true,
        server: 'app',
        //Port number may need to change based on browser sync instances running
        port: 3009,
        open: false
    });
    gulp.watch(['app/src/**/*.scss'], ['styles', reload ]);
    gulp.watch('app/build/*.js').on("change", browserSync.reload);;
});


//Build svg icon sprite sheet
gulp.task('sprite', function(){
    return gulp.src('app/src/images/icons/*.svg')
        .pipe(svgSprite({
            mode:{
                symbol:true
            }
        }))
        .pipe(gulp.dest("app/src/images"))
        .pipe($.size({title: 'sprite'}));
});


//Build svg sprite sheet
gulp.task('svg:background', function(){
    return gulp.src('app/src/images/background/*.svg')
        .pipe($.svgSprites({
            mode:"defs",
            svgId: "svg-%f",
            preview: false
        }))
        .pipe(gulp.dest("app/src/images"))
        .pipe($.size({title: 'svg:background'}));
});

// Output SVG Sprites
gulp.task('svg', [ 'svg:icon', 'svg:background']);

// Compile SCSS
gulp.task('styles', function() {
    return sass('app/src/components', {
        require: 'sass-json-vars',
        noCache: true,
        sourcemap: true
        })
        .on('error', handleErrors)
        .pipe($.sourcemaps.write())
        .pipe(gulp.dest('app/src/components'))
        .pipe($.size({title: 'sass'}));
});
