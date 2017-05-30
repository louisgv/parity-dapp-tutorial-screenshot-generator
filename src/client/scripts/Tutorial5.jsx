import React from 'react';

import {bonds, formatBalance, isNullData} from 'oo7-parity';

import {Bond, TimeBond} from 'oo7';
import {Rspan, Rimg} from 'oo7-react';
import {InputBond, HashBond, BButton, TransactionProgressLabel, TransactButton} from 'parity-reactive-ui';

class BaseScene extends React.Component {
	constructor() {
		super();
		this.gavofyork = bonds
			.registry
			.lookupAddress('gavofyork', 'A');

		this.name = new Bond();
		this.recipient = bonds
			.registry
			.lookupAddress(this.name, 'A');

		this.state = {
			current: null
		}
	}

	give() {
		this.setState({
			current: bonds.post({
				to: this.recipient,
				value: 100 * 1e15
			})
		});
	}
}

export class Screenshot0 extends BaseScene {
	render() {
		return (
			<div>
				My balance:{' '}
				<Rspan>
					{bonds
						.balance(bonds.me)
						.map(formatBalance)}
				</Rspan>
				<br/>
				<BButton
					content='Give gavofyork 100 Finney'
					onClick={() => bonds.post({
					to: this.gavofyork,
					value: 100 * 1e15
				})}/>
			</div>
		)
	}
};

export class Screenshot1 extends BaseScene {
	render() {
		return (
			<div>
				My balance:{' '}
				<Rspan>
					{bonds
						.balance(bonds.me)
						.map(formatBalance)}
				</Rspan>
				<br/>
				<InputBond defaultValue='jutta' bond={this.name} placeholder='Name of recipient'/>
				<BButton
					content={this
					.name
					.map(n => `Give ${n} 100 Finney`)}
					disabled={this
					.recipient
					.map(isNullData)}
					onClick={() => bonds.post({
					to: this.recipient,
					value: 100 * 1e15
				})}/>
			</div>
		)
	}
};

export class Screenshot2 extends BaseScene {
	render() {
		return (
			<div>
				My balance:{' '}
				<Rspan>
					{bonds
						.balance(bonds.me)
						.map(formatBalance)}
				</Rspan>
				<br/>
				<InputBond defaultValue='gavofyork' bond={this.name} placeholder='Name of recipient'/>
				<BButton
					content={this
					.name
					.map(n => `Give ${n} 100 Finney`)}
					disabled={this
					.recipient
					.map(isNullData)}
					onClick={this
					.give
					.bind(this)}/>
				<br/>
				<Rspan>{this.state.current && this
						.state
						.current
						.map(JSON.stringify)}</Rspan>
			</div>
		)
	}
};

export class Screenshot3 extends BaseScene {
	render() {
		return (
			<div>
				My balance:{' '}
				<Rspan>
					{bonds
						.balance(bonds.me)
						.map(formatBalance)}
				</Rspan>
				<br/>
				<InputBond defaultValue='gavofyork' bond={this.name} placeholder='Name of recipient'/>
				<BButton
					content={this
					.name
					.map(n => `Give ${n} 100 Finney`)}
					disabled={this
					.recipient
					.map(isNullData)}
					onClick={this
					.give
					.bind(this)}/>
				<br/>
				<TransactionProgressLabel value={this.state.current}/>
			</div>
		)
	}
};

export class Screenshot4 extends BaseScene {
	render() {
		return (
			<div>
				My balance:{' '}
				<Rspan>
					{bonds
						.balance(bonds.me)
						.map(formatBalance)}
				</Rspan>
				<br/>
				<InputBond defaultValue='gavofyork' bond={this.name} placeholder='Name of recipient'/>

				<TransactButton
					content={this
					.name
					.map(n => `Give ${n} 100 Finney`)}
					disabled={this
					.recipient
					.map(isNullData)}
					tx={{
					to: this.recipient,
					value: 100 * 1e15
				}}/>
			</div>
		)
	}
};
