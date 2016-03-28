var React = require('react');
var ReactDOM = require('react-dom');
var Appbar = require('react-appbar');

var App = React.createClass({
	render () {
		return (
			<div>
				<Appbar className="test">Appbar</Appbar>
			</div>
		);
	}
});

ReactDOM.render(<App />, document.getElementById('app'));
