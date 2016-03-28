var gulp = require('gulp');
var initGulpTasks = require('react-component-gulp-tasks');

var COMPONENT_NAME = 'Appbar';

var taskConfig = {
	component: {
		file: COMPONENT_NAME + '.js',
		name: COMPONENT_NAME,
		src: 'src',
		dist: 'dist',
		dependencies: [
			'classnames',
			'jss',
			'react-jss',
			'jss-vendor-prefixer',
			'object-assign',
			'raf',
			'react',
			'react-dom'
		],
		lib: 'lib'
	},

	example: {
		src: 'example/src',
		dist: 'example/dist',
		files: [
			'index.html',
			'.gitignore'
		],
		scripts: [
			'example.js'
		],
		less: [
			'example.less'
		]
	}

};

initGulpTasks(gulp, taskConfig);
