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

export class Screenshot0 extends React.Component {
	constructor() {
		super();
		this.state = {
			counter: bonds.makeContract(CounterHash, CounterABI)
		};
	}
	render() {
		return(<div>
			<Counter contract={this.state.counter} />
		</div>);
	}
};

class BaseScene extends React.Component {
	constructor() {
		super();
		this.state = {
			tx: null
		};
	}
}

class VoteOptionBarIcons extends ReactiveComponent {
	constructor() {
		super(['votes', 'enabled', 'already']);
	}
	readyRender() {
		const {
			vote,
			label
		} = this.props;
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
				onClick={vote}>
					{label}
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

class Counter extends BaseScene {

	componentWillMount() {
		this.componentWillReceiveProps(this.props);
	}
	componentWillReceiveProps(props) {
		const {contract} = this.props;
		this.voted = contract.hasVoted(bonds.me);
		this.prevVote = contract.Voted({
			who: bonds.me
		});
		this.prevVotes = contract.Voted({
			who: bonds.accounts
		});
	}

	render() {
		const votingEnabled = Bond.all([this.voted, this.state.tx])
			.map(([v, t]) => !v && (!t || !!t.failed));
		const {
			contract
		} = this.props;
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
							votes={contract.votes(i)}
							vote={()=> this.setState({
								tx : contract.vote(i)
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