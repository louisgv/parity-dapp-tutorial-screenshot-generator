import React from 'react';

import {Bond, TimeBond} from 'oo7';
import {Rspan} from 'oo7-react';
import {bonds} from 'oo7-parity';
import {InputBond} from 'parity-reactive-ui';

const computeColor = t => t.match(/^[0-9]+$/)
	? 'red'
	: 'black';

const format = ([msg, t]) => `${new Date(t)}: ${msg}`;

class BaseScene extends React.Component {
	constructor() {
		super();
		this.bond = new Bond();
		this.time = new TimeBond();
	}
}

export class Screenshot0 extends BaseScene {
	render() {
		return (
			<div>
				<InputBond
					defaultValue='Hello world'
					placeholder="Go ahead and type some text"
					bond={this.bond}/>
				<Rspan>{this.bond}</Rspan>
			</div>
		);
	}
}

export class Screenshot1 extends BaseScene {
	render() {
		return (
			<div>
				<InputBond bond={this.bond} defaultValue="Hello world!" placeholder="Go ahead and type some text"/>
				<Rspan>{this
						.bond
						.map(t => t.toUpperCase())}</Rspan>
			</div>
		);
	}
}

export class Screenshot2 extends BaseScene {
	render() {
		return (
			<div>
				<InputBond bond={this.bond} defaultValue={"4891"} placeholder="Go ahead and type some text"/>
				<Rspan style={this
					.bond
					.map(t => t.match(/^[0-9]+$/)
						? {
							color: 'red'
						}
						: {
							color: 'black'
						})}>
					{this
						.bond
						.map(t => t.toUpperCase())}
				</Rspan>

			</div>
		);
	}
}

export class Screenshot3 extends BaseScene {
	render() {
		return (
			<div>
				<InputBond bond={this.bond} defaultValue={"The time is: "} placeholder="Go ahead and type some text"/>
				<Rspan style={{
					color: this
						.bond
						.map(t => t.match(/^[0-9]+$/)
							? 'red'
							: 'black')
				}}>
					{Bond.all([this.bond, this.time])}
				</Rspan>
			</div>
		);
	}
}

export class Screenshot4 extends BaseScene {
	render() {
		return (
			<div>
				<InputBond bond={this.bond} defaultValue={"Hello"} placeholder="Go ahead and type some text"/>
				<Rspan style={{
					color: this
						.bond
						.map(computeColor)
				}}>
					{Bond
						.all([this.bond, this.time])
						.map(format)}
				</Rspan>
			</div>
		);
	}
}
