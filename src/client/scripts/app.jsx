import React from 'react';

import {Bond, TimeBond} from 'oo7';
import {Rspan} from 'oo7-react';
import {InputBond} from 'parity-reactive-ui';

export class App extends React.Component {
	constructor() {
		super();
		this.bond = new Bond();
		this.time = new TimeBond();
	}

	render() {
		return (
			<div>
				<InputBond bond={this.bond} placeholder="Go ahead and type some text"/>
				<Rspan style={{
					color: this
						.bond
						.map((t) => t.match(/^[0-9]+$/)
							? 'red'
							: 'black')
				}}>
					{Bond
						.all([this.bond, this.time])
						.map(([msg, t]) => `${new Date(t)}: ${msg}`)}
				</Rspan>
			</div>
		);
	}
}
