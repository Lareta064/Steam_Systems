const gulp = require("gulp");
const browserSync = require("browser-sync").create();
const watch = require("gulp-watch");
const sass = require("gulp-sass")(require('sass'));
const autoprefixer = require("gulp-autoprefixer");
const sourcemaps = require("gulp-sourcemaps");
const notify = require("gulp-notify");
const plumber = require("gulp-plumber");
const pug = require("gulp-pug");
const del = require("del");
const gcmq = require("gulp-group-css-media-queries");
const formatHtml = require('gulp-format-html');
const imagemin = require('gulp-imagemin');
const webp = require('gulp-webp');
const cached = require('gulp-cached');
const remember = require('gulp-remember');

// Task для Pug
gulp.task("pug", function(callback) {
    return gulp
        .src("./src/pug/pages/**/*.pug")
        .pipe(
            plumber({
                errorHandler: notify.onError(function(err) {
                    return {
                        title: "Pug",
                        sound: false,
                        message: err.message
                    };
                })
            })
        )
        .pipe(cached('pug'))
        .pipe(
            pug({
                pretty: '\t'
            })
        )
        .pipe(remember('pug'))
        .pipe(gulp.dest("./build/"))
        .pipe(browserSync.stream());
    callback();
});

gulp.task("pugUi", function(callback) {
    return gulp
        .src("./src/pug/ui/**/*.pug")
        .pipe(
            plumber({
                errorHandler: notify.onError(function(err) {
                    return {
                        title: "Pug",
                        sound: false,
                        message: err.message
                    };
                })
            })
        )
        .pipe(cached('pugUi'))
        .pipe(
            pug({
                pretty: '\t'
            })
        )
        .pipe(remember('pugUi'))
        .pipe(gulp.dest("./build/ui/"))
        .pipe(browserSync.stream());
    callback();
});

// Task для SCSS
gulp.task("scss", function(callback) {
    return gulp
        .src("./src/scss/main.scss")
        .pipe(
            plumber({
                errorHandler: notify.onError(function(err) {
                    return {
                        title: "Styles",
                        sound: false,
                        message: err.message
                    };
                })
            })
        )
        .pipe(sourcemaps.init())
        .pipe(sass({
            outputStyle: 'expanded',
        }))
        .pipe(
            autoprefixer({
                overrideBrowserslist: ["last 4 versions"]
            })
        )
        .pipe(gcmq())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest("./build/css/"))
        .pipe(browserSync.stream());
    callback();
});

// Task для изображений
gulp.task("copy:img", function(callback) {
    return gulp.src("./src/img/**/*.*")
        .pipe(cached('img'))
        .pipe(webp())
        .pipe(remember('img'))
        .pipe(gulp.dest("./build/img/"));
    callback();
});

// Task для библиотек
gulp.task("copy:libs", function(callback) {
    return gulp.src("./src/libs/**/*.*")
        .pipe(cached('libs'))
        .pipe(remember('libs'))
        .pipe(gulp.dest("./build/libs/"));
    callback();
});

// Task для JS
gulp.task("copy:js", function(callback) {
    return gulp.src("./src/js/**/*.*")
        .pipe(cached('js'))
        .pipe(remember('js'))
        .pipe(gulp.dest("./build/js/"));
    callback();
});

// Task для видео
gulp.task("copy:video", function(callback) {
    return gulp.src("./src/video/**/*.*")
        .pipe(cached('video'))
        .pipe(remember('video'))
        .pipe(gulp.dest("./build/video/"));
    callback();
});

// Task для шрифтов
gulp.task("copy:fonts", function(callback) {
    return gulp.src("./src/fonts/**/*.*")
        .pipe(cached('fonts'))
        .pipe(remember('fonts'))
        .pipe(gulp.dest("./build/fonts/"));
    callback();
});

// Watch task
gulp.task("watch", function() {
    watch(["./build/js/**/*.*", "./build/img/**/*.*", "./build/libs/**/*.*", "./build/video/**/*.*", "./build/fonts/**/*.*"], gulp.parallel(browserSync.reload));

    watch("./src/scss/**/*.scss", function() {
        setTimeout(gulp.parallel("scss"), 500);
    });

    watch("./src/pug/**/*.pug", gulp.parallel("pug"));
    watch("./src/pug/ui/*.pug", gulp.parallel("pugUi"));

    watch("./src/img/**/*.*", gulp.parallel("copy:img"));
    watch("./src/js/**/*.*", gulp.parallel("copy:js"));

    watch("./src/libs/**/*.*", gulp.parallel("copy:libs"));
    watch("./src/video/**/*.*", gulp.parallel("copy:video"));
    watch("./src/fonts/**/*.*", gulp.parallel("copy:fonts"));
});

// Server task
gulp.task("server", function() {
    browserSync.init({
        server: {
            baseDir: "./build/"
        }
    });
});

// Clean task
gulp.task("clean:build", function() {
    return del("./build");
});

// HTML prettify task
gulp.task("html:prettify", function() {
    return gulp
        .src('build/**/*.html')
        .pipe(formatHtml())
        .pipe(gulp.dest('./build/'));
});

// Default task
gulp.task("default", gulp.series(
    gulp.parallel("clean:build"),
    gulp.parallel("scss", "copy:fonts", "pug", "pugUi", "copy:img", "copy:js", "copy:libs", "copy:video"),
    gulp.parallel("html:prettify"),
    gulp.parallel("server", "watch")
));
