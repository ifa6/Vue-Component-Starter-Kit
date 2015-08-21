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
var notify = require('gulp-notify');
var svgSprite = require('gulp-svg-sprite');
var ghPages = require('gulp-gh-pages');
var rename = require("gulp-rename");
var replace = require('gulp-replace');
var argv = require('yargs').argv;
var fs = require('fs');


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

// Copy all files at the root level (app)
gulp.task('copy', () =>
gulp.src([
    'app/index.html',
    'app/**/*',
    '!app/components/**/*.vue',
    '!app/components/**/*.js',
    '!app/components/**/*.css',
    '!app/components/**/*.md',
    '!app/components/**/*.scss'
    //'node_modules/apache-server-configs/dist/.htaccess'
], {
    dot: true
}).pipe(gulp.dest('dist'))
    .pipe($.size({title: 'copy'}))
);



// Lint JavaScript
gulp.task('jshint', function () {
    return gulp.src(['app/**/*.js'])
        .pipe(reload({stream: true, once: true}))
        .pipe($.jshint())
        .pipe($.jshint.reporter('jshint-stylish'))
        .pipe($.if(!browserSync.active, $.jshint.reporter('fail')));
});

//Inject Sprite
gulp.task('inject:sprite', function () {
    var target = gulp.src('./app/components/uti/sprite/sprite.vue');


    return target.pipe(inject(gulp.src(['./app/images/symbol/svg/sprite.symbol.svg']), {
            starttag: '<!-- inject:svg -->',
            transform: function (filePath, file) {
                // return file contents as string
                return file.contents.toString('utf8')
            }
        }))
        .pipe(gulp.dest('./app/components/uti/sprite/'));
});

gulp.task('inject:block', function () {
    var target = gulp.src('.webpack.config.js');


    return target.pipe(inject(gulp.src([argv.name]), {
        starttag: '<!-- inject:svg -->',
        transform: function (filePath, file) {
            // return file contents as string
            return file.contents.toString('utf8')
        }
    }))
        .pipe(gulp.dest('./app/components/uti/sprite/'));
});

gulp.task('webpack:watch', function(cb) {
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

// Clean Outputs
gulp.task('clean:dist', del.bind(null, [ 'dist/*'], {dot: true}));
// Clean Built CSS
gulp.task('clean:css', del.bind(null, [ 'app/components/**/*.css'], {dot: true}));

//Clean task
gulp.task('clean', [ 'clean:dist', 'clean:css']);


gulp.task('startup', ['clean'], cb =>
        runSequence(
            'styles',
            ['copy', 'webpack:watch'],
            cb
        )
);


// Watch Files For Changes & Reload
gulp.task('default',['startup'], function () {
    browserSync({
        notify: false,
        // Customize the BrowserSync console logging prefix
        logPrefix: 'VUE',
        // Run as an https by uncommenting 'https: true'
        // Note: this uses an unsigned certificate which on first access
        //       will present a certificate warning in the browser.
        // https: true,
        server: 'dist',
        open: false
    });
    gulp.watch('app/components/**/*.scss', ['styles']);
    gulp.watch('app/components/utilities/**/*.scss', ['sass-json']);
    gulp.watch('dist/js/*.js').on("change", browserSync.reload);
});


//Build svg icon sprite sheet
gulp.task('sprite', function(){
    return gulp.src('app/images/icons/*.svg')
        .pipe(svgSprite({
            mode:{
                symbol:true
            }
        }))
        .pipe(gulp.dest("app/images"))
        .pipe($.size({title: 'sprite'}));
});


//Build svg sprite sheet
gulp.task('svg:background', function(){
    return gulp.src('app/images/background/*.svg')
        .pipe($.svgSprites({
            mode:"defs",
            svgId: "svg-%f",
            preview: false
        }))
        .pipe(gulp.dest("app/images"))
        .pipe($.size({title: 'svg:background'}));
});

// Output SVG Sprites
gulp.task('svg', [ 'svg:icon', 'svg:background']);

// Compile SCSS
gulp.task('styles', function() {
    return gulp.src('./app/components/**/*.scss')
        .pipe($.sourcemaps.init())
        .pipe($.sass())
        .on('error', handleErrors)
        .pipe($.sourcemaps.write())
        .pipe(gulp.dest('./app/components'))
        .pipe($.size({title: 'sass'}));
});

gulp.task('ghPages', function() {
    return gulp.src('./app/**/*')
        .pipe(ghPages());
});


gulp.task('block', function(){
    var path ='app/components/blocks/' + argv.name
    if( fs.existsSync(path)){
        console.log("CHECK THE BLOCK NAME PLEASE")
    }else
    {
        gulp.src('lib/gulp-templates/block/**/**')
            .pipe(rename(function (path) {
                if (path.basename.indexOf('block') > -1) {
                    path.basename = path.basename.replace('block', argv.name);
                }
            }))
            .pipe(replace('block', argv.name))
            .pipe(gulp.dest(path));
    }
});

gulp.task('sass-json', function () {
    return gulp
        .src('./app/components/utilities/styles/*.scss')
        .pipe($.sassJson())
        .pipe(gulp.dest('../app/components/utilities/sass-json-vars'));
});





