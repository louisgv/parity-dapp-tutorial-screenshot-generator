import {bonds, formatBlockNumber, formatBalance} from 'oo7-parity';

import React from 'react';

import {Bond, TimeBond} from 'oo7';
import {Rspan} from 'oo7-react';

import {InputBond} from 'parity-reactive-ui';

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
			<Rspan>{bonds.height}</Rspan>
		);
	}
}

export class Screenshot1 extends BaseScene {
	render() {
		return (
			<div>
				Current block is: {' '}
				<Rspan style={{
					fontWeight: 'bold'
				}}>
					{bonds
						.height
						.map(formatBlockNumber)}
				</Rspan>
			</div>
		);
	}
}

export class Screenshot2 extends BaseScene {
	render() {
		window.bonds = bonds;
		// bonds.blocks[69].log()
		return (
			<div>
				Current block is: {' '}
				<Rspan style={{
					fontWeight: 'bold'
				}}>
					{bonds
						.height
						.map(formatBlockNumber)}
				</Rspan>
			</div>
		);
	}
}

export class Screenshot3 extends BaseScene {
	render() {
		return (
			<div>
				Latest block's timestamp is:{' '}
				<Rspan style={{
					fontWeight: 'bold'
				}}>
					{bonds
						.head
						.timestamp
						.map(_ => _.toString())}
				</Rspan>
			</div>
		);
	}
}

export class Screenshot4 extends BaseScene {
	render() {
		return (
			<div>
				Current block author's balance is:{' '}
				<Rspan style={{
					fontWeight: 'bold'
				}}>
					{bonds
						.balance(bonds.head.author)
						.map(formatBalance)}
				</Rspan>
			</div>
		);
	}
}

export class Screenshot5 extends BaseScene {
	render() {
		return (
			<div>
				Accounts available:{' '}
				<Rspan>
					{bonds
						.accounts
						.map(_ => _.join(', '))}
				</Rspan>
			</div>
		);
	}
}

export class Screenshot6 extends BaseScene {
	render() {
		return (
			<div>
				Default account:{' '}
				<Rspan>{bonds.me}</Rspan>
			</div>
		);
	}
}

export class Screenshot7 extends BaseScene {
	render() {
		return (
			<div>
				Default account:{' '}
				<Rspan>{bonds.me}</Rspan>
				<br/>With a balance of{' '}
				<Rspan>
					{bonds
						.balance(bonds.me)
						.map(formatBalance)}
				</Rspan>
			</div>
		);
	}
}

export class Screenshot8 extends BaseScene {
	render() {
		return (
			<div>
				Default account:{' '}
				<Rspan>{bonds.me}</Rspan>
				<br/>Given the name of{' '}
				<Rspan>
					{bonds.accountsInfo[bonds.me].name}
				</Rspan>
				<br/>With a balance of{' '}
				<Rspan>
					{bonds
						.balance(bonds.me)
						.map(formatBalance)}
				</Rspan>
			</div>
		);
	}
}
