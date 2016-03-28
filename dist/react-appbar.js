(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.Appbar = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (global){
'use strict';

var React = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);
var ReactDOM = require('react-dom');
var raf = require('raf');
var useSheet = require('./jss').useSheet;
var stylesheet = require('./stylesheet');

var Button = React.createClass({
  displayName: 'Button',

  componentDidMount: function componentDidMount() {
    this.ticking = false;
    this.lastScrollY = 0;
    this.latestScrollY = 0;
    this.init = true;

    var appbar = this.find('wrapper');

    // set spacer height
    var appbarHeight = appbar.offsetHeight;
    this.setSpacerHeight(appbarHeight);

    // initialize appbar top position
    if (this.init) {
      appbar.style.top = '0px';
    }

    window.addEventListener('scroll', this.onScrollHandle);
  },

  componentWillUnmount: function componentWillUnmount() {
    window.removeEventListener('scroll', this.onScrollHandle);
  },

  onScrollHandle: function onScrollHandle() {
    this.latestScrollY = window.scrollY;
    this.requestTick();
  },

  setSpacerHeight: function setSpacerHeight(height) {
    var spacer = this.find('spacer');
    spacer.style.height = height + 'px';
  },

  requestTick: function requestTick() {
    if (!this.ticking) {
      raf(this.toggleAppbar);
      this.ticking = true;
    }
  },

  resetPosition: function resetPosition(elem) {
    elem.style.top = '0px';
    return;
  },

  showAppbar: function showAppbar(elem, elTop) {
    var elLocation = elTop > 0 ? 0 : elTop;
    elem.style.top = elLocation + 'px';
    return;
  },

  hideAppbar: function hideAppbar(elem, elTop, elHeight) {
    var elLocation = Math.abs(elTop) > elHeight ? -elHeight : elTop;

    if (elTop === 0) {
      elLocation = 0;
    }

    elem.style.top = elLocation + 'px';
  },

  find: function find(ref) {
    var target = this.refs[ref];
    var node = ReactDOM.findDOMNode(target);

    return node;
  },

  toggleAppbar: function toggleAppbar() {
    var currentScrollPosition = window.pageYOffset;
    var lastScrollPosition = this.lastScrollY;

    var scrollDiff = lastScrollPosition - currentScrollPosition;
    var appbar = this.find('wrapper');
    var elHeight = appbar.offsetHeight;
    var elStyle = window.getComputedStyle(appbar);
    var elTopProp = parseInt(elStyle.getPropertyValue('top'));
    var elTop = elTopProp + scrollDiff || 0;

    if (currentScrollPosition <= 0) {
      this.resetPosition(appbar);
    } else if (scrollDiff > 0) {
      this.showAppbar(appbar, elTop);
    } else if (scrollDiff < 0) {
      // thumb scrolled up
      // hide appbar

      // initialize appbar top position
      if (this.init) {
        elTop = 0;
        this.init = false;
      }

      this.hideAppbar(appbar, elTop, elHeight);
    }

    this.lastScrollY = currentScrollPosition;
    this.ticking = false;
  },

  render: function render() {
    var classes = this.props.sheet.classes;
    var userDefinedClass = this.props.className;
    var mergedWrapperClass = classes.wrapper + ' ' + userDefinedClass;

    return React.createElement(
      'div',
      null,
      React.createElement(
        'div',
        {
          ref: 'wrapper',
          className: mergedWrapperClass
        },
        this.props.children
      ),
      React.createElement('div', { className: classes.fixed }),
      React.createElement('div', { ref: 'spacer' })
    );
  }
});

module.exports = useSheet(Button, stylesheet.styles);

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./jss":2,"./stylesheet":3,"raf":undefined,"react-dom":undefined}],2:[function(require,module,exports){
'use strict';

var jss = require('jss').create();

jss.use(require('jss-vendor-prefixer'));

var useSheet = require('react-jss')['default'](jss);

exports.jss = jss;
exports.useSheet = useSheet;

},{"jss":undefined,"jss-vendor-prefixer":undefined,"react-jss":undefined}],3:[function(require,module,exports){
'use strict';

var styles = {
  wrapper: {
    position: 'fixed',
    top: 0,
    left: 0,
    'z-index': 200,
    width: '100%'
  },
  fixed: {
    position: 'fixed'
  }
};

exports.styles = styles;

},{}]},{},[1])(1)
});