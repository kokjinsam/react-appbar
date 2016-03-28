'use strict';

var jss = require('jss').create();

jss.use(require('jss-vendor-prefixer'));

var useSheet = require('react-jss')['default'](jss);

exports.jss = jss;
exports.useSheet = useSheet;