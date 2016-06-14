import React, { PropTypes } from 'react';
import createAutoReveal from './createAutoReveal';

const propTypes = {
	top: PropTypes.number.isRequired,
	style: PropTypes.any,
	children: PropTypes.any.isRequired,
};

const Appbar = ({
	top,
	style,
	children,
}) => {
	const navStyle = {
		...style,
		transform: `translateY(${top}px)`,
	};

	return (
		<div style={navStyle}>
			{children}
		</div>
	);
};

Appbar.propTypes = propTypes;

export default createAutoReveal(Appbar);
