let gulp = require('gulp'),
    sass = require('gulp-sass'),
    rename = require('gulp-rename'),
    browserSync = require('browser-sync'),
    autoPrefixer = require('gulp-autoprefixer'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    cssmin = require('gulp-cssmin');

gulp.task('sass', function () {
    return gulp.src('app/scss/**/*.scss') // Ищем файл, который нужен
        .pipe(sass({ outputStyle: 'compressed' })) // запускаем компил (В виде объекта задаем параметры компила)
        .pipe(rename({ suffix: '.min' })) // Переименовываем в нужное нам имя
        .pipe(autoPrefixer({
            overrideBrowserslist: ['last 8 versions']
        }))
        .pipe(gulp.dest('app/css')) // выкидываем в нужную папку
        .pipe(browserSync.reload({ stream: true }))
});

gulp.task('html', function () {
    return gulp.src('app/*.html').pipe(browserSync.reload({ stream: true }))

});
gulp.task('style', function () {
    return gulp.src([
        'node_modules/normalize.css/normalize.css',
        'node_modules/slick-carousel/slick/slick.css',
        'node_modules/magnific-popup/dist/magnific-popup.css'
    ])
        .pipe(concat('libs.min.css'))
        .pipe(cssmin())
        .pipe(gulp.dest('app/css'))
})
gulp.task('script', function () {
    return gulp.src([
        'node_modules/slick-carousel/slick/slick.js',
        'node_modules/magnific-popup/dist/jquery.magnific-popup.js'
    ])
        .pipe(concat('libs.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('app/js'))
})
gulp.task('js', function () {
    return gulp.src('app/js/*.js').pipe(browserSync.reload({ stream: true }))

});
gulp.task('browser-sync', function () {
    browserSync.init({
        server: "./app"
    });
});

gulp.task('watch', function () {
    gulp.watch('app/scss/**/*.scss', gulp.parallel('sass')); // следит за файлом и если есть изменения запускай таск
    gulp.watch('app/*.html', gulp.parallel('html'));
    gulp.watch('app/js/*.js', gulp.parallel('js'));
});

gulp.task('default', gulp.parallel('style', 'script','sass', 'watch', 'browser-sync'))