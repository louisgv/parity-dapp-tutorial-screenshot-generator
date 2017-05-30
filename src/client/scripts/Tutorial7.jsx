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
	Rimg,
	ReactiveComponent
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

		this.voted = this.counter.hasVoted(bonds.me);

		this.state = {
			tx: null
		};
	}
}

class VoteOption extends ReactiveComponent {
	constructor() {
		super(['votes', 'enabled']);
	}
	readyRender() {
		const s = {
			float: 'left',
			minWidth: '3em',
			cursor: this.state.enabled ?
				'pointer' :
				'not-allowed'
		};
		return(
		<span style={{
			borderLeft:
			`${1 + this.state.votes * 10}px black solid`
		}}>
			<a
				style={s}
				href='#'
				onClick={this.props.vote}>
					{this.props.label}
			</a>
		</span>);
	}
}

export class Screenshot0 extends BaseScene {
	render() {
		return(
			<div>
				{Options.map((n, i) => (
					<div key={i}>
						<Rspan style={{
							borderLeft: this
								.counter
								.votes(i)
								.map(v => `${ 1 + v * 10}px black solid`)
						}}>
							<a style={{
								float: 'left',
								minWidth: '3em'
							}} href='#' onClick={() => this.setState({
								tx: this
									.counter
									.vote(i)
							})}>
								{n}
							</a>
						</Rspan>
					</div>
				))}
				<div style={{
						marginTop: '1em'
					}}>
					<TransactionProgressLabel value={this.state.tx}/>
				</div>
			</div>
		)
	}
};


export class Screenshot1 extends BaseScene {
	render() {
		const votingEnabled = Bond.all([
			this.voted, this.state.tx
		])
			.map(([v, t]) => !v && (!t || !!t.failed));

		return(
			<div>
				{Options.map((n, i) => (
					<div key={i}>
						<VoteOption
							enabled={votingEnabled}
							label={n}
							votes={this.counter.votes(i)}
							vote={()=> this.setState({
								tx : this.counter.vote(i)
							})}
							/>
					</div>
				))}
				<div style={{
						marginTop: '1em'
					}}>
					<TransactionProgressLabel value={this.state.tx}/>
				</div>
			</div>
		)
	}
};
