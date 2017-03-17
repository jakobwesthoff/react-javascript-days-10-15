/*eslint-env node */
"use strict";

var gulp = require("gulp");
var $$ = require("gulp-load-plugins")();
var exec = require("child_process").exec;
var run = require("run-sequence");

function execLive(command, next) {
    var child = exec(command, {maxBuffer: Number.MAX_SAFE_INTEGER}, next);

    child.stdout.on("data", function (data) {
        process.stdout.write(data);
    });

    child.stderr.on("data", function (data) {
        process.stderr.write(data);
    });
}

gulp.task("clean", function() {
    return gulp.src(["Distribution/"])
        .pipe($$.rimraf());
});

gulp.task("bundle", function (next) {
    execLive("node_modules/.bin/webpack", next);
});

gulp.task("serve", function (next) {
    execLive("./node_modules/.bin/webpack-dev-server", next);
});

gulp.task("copy:html", function() {
    return gulp.src("*.html")
        .pipe(gulp.dest("Distribution/"));
});
gulp.task("copy:data", function() {
    return gulp.src("Data/**/*", {base: '.'})
        .pipe(gulp.dest("Distribution/"));
});

gulp.task("default", function(next) {
    run(
        "clean",
        "copy:html",
        "copy:data",
        "bundle",
        next
    );
});

gulp.task("isomorphic-serve", function (next) {
    execLive("/usr/bin/env node ./server.js", next);
});

gulp.task("isomorphic", function(next) {
    run(
        "clean",
        "copy:html",
        "copy:data",
        "bundle",
        "isomorphic-serve",
        next
    );
});
