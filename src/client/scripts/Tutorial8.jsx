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
	AccountIcon,
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

		this.prevVote = this.counter.Voted({
			who: bonds.me
		});

		this.prevVotes = this.counter.Voted({
			who: bonds.accounts
		});

		this.state = {
			tx: null
		};
	}
}

class VoteOptionBar extends ReactiveComponent {
	constructor() {
		super(['votes', 'enabled']);
	}
	readyRender() {
		const s = {
			float: 'left',
			minWidth: '3em',
			cursor: this.state.enabled ?
				'pointer' : 'not-allowed'
		};
		return(<span style={{ borderLeft:
			`${1 + this.state.votes * 10}px black solid` }}>
			<a
				style={s}
				href='#'
				onClick={this.state.enabled && this.props.vote}>
					{this.props.label}
			</a>
		</span>);
	}
}

export class Screenshot0 extends BaseScene {
	render() {
		const votingEnabled = Bond.all([this.voted, this.state.tx])
			.map(([v, t]) => !v && (!t || !!t.failed));
		return(
			<div>
				{Options.map((n, i) => (
					<div key={i}>
						<VoteOptionBar
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
				<Rspan>
					{this.prevVote.map(v => v.length > 0
						? `Already voted for ${Options[v[0].option]}`
						: '')}
				</Rspan>
			</div>
		)
	}
};


class VoteOptionBarIcons extends ReactiveComponent {
	constructor() {
		super(['votes', 'enabled', 'already']);
	}
	readyRender() {
		const s = {
			float: 'left',
			minWidth: '3em',
			cursor: this.state.enabled ?
				'pointer' : 'not-allowed'
		};
		return(<span style={{ borderLeft:
			`${1 + this.state.votes * 10}px black solid` }}>
			<a
				style={s}
				href='#'
				onClick={this.state.enabled && this.props.vote}>
					{this.props.label}
			</a>
			{this.state.already.map(a => (<AccountIcon
				style={{
					width: '1.2em',
					verticalAlign: 'bottom',
					marginLeft: '1ex'
				}}
				key={a}
				address={a}
				/>))}
		</span>);
	}
}


export class Screenshot1 extends BaseScene {
	render() {
		const votingEnabled = Bond.all([this.voted, this.state.tx])
			.map(([v, t]) => !v && (!t || !!t.failed));
		return(
			<div>
				{Options.map((n, i) => (
					<div key={i}>
						<VoteOptionBarIcons
							already={
								this.prevVotes.map(a =>
									a.filter(x => x.option == i)
									.map(x => x.who)
								)
							}
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
				<Rspan>
					{this.prevVote.map(v => v.length > 0
						? `Already voted for ${Options[v[0].option]}`
						: '')}
				</Rspan>

			</div>
		)
	}
};
