#! /usr/bin/env node
/**
 * Created with JetBrains WebStorm.
 * User: luckystar
 * Date: 13-7-30
 * Time: 上午11:02
 * To change this template use File | Settings | File Templates.
 */

var path = require('path'),
    argv = require('optimist')
        .options('m', {
            alias:'minify',
            describe:'use uglify.js to minify *.js'
        })
        .options('t', {
            alias:'target',
            describe:'target filename'
        })
        .usage('Validate & convert xFace application package(zip):\n   $0 test.zip')
        .demand(1)
        .argv;

require('./src/zip.validator')({
    source:argv._[0],
    target:argv.target,
    minify:argv.minify
});

