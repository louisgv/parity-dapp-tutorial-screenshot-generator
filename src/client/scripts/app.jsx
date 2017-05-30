import React from 'react';

// NOTE: For future automation:
// const tut = 6; // min: 1
// const ss = 0; // min: 0

const {tut, ss} = require('../../scene.json');

const Snapshot = require(`./Tutorial${tut}`)[`Screenshot${ss}`];

export class App extends React.Component {
	render() {
		return (<Snapshot/>);
	}
}
