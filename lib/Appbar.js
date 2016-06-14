'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _createAutoReveal = require('./createAutoReveal');

var _createAutoReveal2 = _interopRequireDefault(_createAutoReveal);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var propTypes = {
	top: _react.PropTypes.number.isRequired,
	style: _react.PropTypes.any,
	children: _react.PropTypes.any.isRequired
};

var Appbar = function Appbar(_ref) {
	var top = _ref.top;
	var style = _ref.style;
	var children = _ref.children;

	var navStyle = (0, _extends3.default)({}, style, {
		transform: 'translateY(' + top + 'px)'
	});

	return _react2.default.createElement(
		'div',
		{ style: navStyle },
		children
	);
};

Appbar.propTypes = propTypes;

exports.default = (0, _createAutoReveal2.default)(Appbar);