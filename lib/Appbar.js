'use strict';

var React = require('react');
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
    var lastScrollPosition = window.scrollY;

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
