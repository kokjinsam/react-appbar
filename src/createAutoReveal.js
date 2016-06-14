import React, { PropTypes, Component } from 'react';
import ReactDOM from 'react-dom';
import hoistNonReactStatic from 'hoist-non-react-statics';

const getDisplayName = component => (
  component.displayName || component.name || 'Component'
);

function createAutoReveal(Appbar) {
  class AutoReveal extends Component {
    state = {
      ticking: false,
      lastScrollY: 0,
      latestScrollY: 0,
      top: 0,
    }

    componentDidMount() {
      window.addEventListener('scroll', this.handleScrollWindow);
      window.addEventListener('resize', this.handleResizeWindow);
    }

    componentWillUnmount() {
      window.removeEventListener('scroll', this.handleScrollWindow);
      window.removeEventListener('resize', this.handleResizeWindow);
    }

    handleScrollWindow = () => {
      this.toggleAppbar();
    }

    find = (ref) => {
      const target = this.refs[ref];
      const node = ReactDOM.findDOMNode(target);
      return node;
    }

    toggleAppbar = () => {
      const currentScrollPosition = window.scrollY;
      const lastScrollPosition = this.state.lastScrollY;

      const scrollDiff = lastScrollPosition - currentScrollPosition;
      const appbar = this.find('wrapper');
      const elHeight = appbar.offsetHeight;
      const elTopProp = this.state.top;
      const elTop = elTopProp + scrollDiff;

      let elLocation;
      if (currentScrollPosition === 0) {
        // scrolled to the very top
        elLocation = 0;
      } else if (scrollDiff > 0) {
        // thumb scrolled down
        elLocation = elTop > 0 ? 0 : elTop;
      } else if (scrollDiff < 0) {
        // thumb scrolled up
        elLocation = Math.abs(elTop) > elHeight ? -elHeight : elTop;
      }

      this.setState({
        lastScrollY: window.scrollY,
        top: elLocation,
      });
    }

    render() {
      const { top } = this.state;

      return (
        <Appbar
          ref="wrapper"
          top={top}
          {...this.props}
        />
      );
    }
  }

  AutoReveal.displayName = `AutoReveal(${getDisplayName(Appbar)})`;

  return hoistNonReactStatic(AutoReveal, Appbar);
}

export default createAutoReveal;
