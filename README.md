# React Appbar (v2.0.0)

An appbar based on [Sticky Header Auto-Reveal by MrPirrera](http://codepen.io/pirrera/pen/rayoLW).

## Examples

![gif](./demo/demo.gif)


## Installation

```
npm install react-appbar --save
```

## Basic Usage

This package comes with a pre-defined appbar. Alternatively, you can use `createAutoReveal()` to create your own appbar.
```
var Appbar = require('react-appbar');

<Appbar>
	This is an appbar
</Appbar>
```

## Full APIs

1. `createAutoReveal(Appbar)` - This function takes React component as its only argument. For example,

		```
		import React from 'react';
		import { createAutoReveal } from 'react-appbar';

		const MyAppbar = ({
			top,
		}) => {
			const appbarStyle = {
				...yourStyle,
				transform: `translateY(${top}px)`,   //--- this is important
			}

			return (
				<div style={appbarStyle}>
					<span>Appbar</span>
				</div>
			)
		}

		export default MyAppbar;
		```

## License

MIT
