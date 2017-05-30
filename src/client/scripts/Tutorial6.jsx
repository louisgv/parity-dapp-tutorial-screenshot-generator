import React from 'react';

import {
	bonds,
	formatBalance,
	isNullData
} from 'oo7-parity';

import {
	Bond,
	TimeBond
} from 'oo7';
import {
	Rspan,
	Rimg
} from 'oo7-react';
import {
	InputBond,
	HashBond,
	BButton,
	TransactionProgressLabel,
	TransactButton
} from 'parity-reactive-ui';

import {
	CounterHash,
	CounterABI
} from './abi';

const Options = ['Red', 'Green', 'Blue'];

class BaseScene extends React.Component {
	constructor() {
		super();
		this.counter = bonds.makeContract(CounterHash, CounterABI);
	}
}

export class Screenshot0 extends BaseScene {
	render() {
		return(
			<div>
				{Options.map((n, i) => (<div key={i}>
					<Rspan style={{
						borderLeft: this.counter
							.votes(i)
							.map(v => `${1 + v * 10}px black solid`)
					}}>
						<span style={{float: 'left', minWidth: '3em'}}>
							{n}
						</span>
					</Rspan>
				</div>))}
			</div>
		)
	}
};
