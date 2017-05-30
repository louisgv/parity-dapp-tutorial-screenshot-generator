import React from 'react';

import {bonds, formatBalance, GitHubHintABI} from 'oo7-parity';

import {Bond, TimeBond} from 'oo7';
import {Rspan, Rimg} from 'oo7-react';
import {InputBond, HashBond} from 'parity-reactive-ui';

class BaseScene extends React.Component {
	constructor() {
		super();
		this.bond = new Bond();
		this.time = new TimeBond();
		const ghAddress = bonds
			.registry
			.lookupAddress('githubhint', 'A')

		this.GithubHint = bonds.makeContract(ghAddress, GitHubHintABI);
	}
}

export class Screenshot0 extends BaseScene {
	render() {
		return (
			<div>
				gavofyork's address is{' '}
				<Rspan>{bonds
						.registry
						.lookupAddress('gavofyork', 'A')}</Rspan>
			</div>
		)
	}
};

export class Screenshot1 extends BaseScene {
	render() {
		return (
			<div>
				Address of
				<InputBond defaultValue='gavofyork' bond={this.bond} placeholder='Lookup a name'/>
				is:<br/>
				<Rspan>{bonds
						.registry
						.lookupAddress(this.bond, 'A')}</Rspan>
				, its balance is{' '}
				<Rspan>
					{bonds
						.balance(bonds.registry.lookupAddress(this.bond, 'A'))
						.map(formatBalance)}
				</Rspan>

			</div>
		)
	}
};

export class Screenshot2 extends BaseScene {
	render() {
		return (
			<div>
				URL for content
				<HashBond defaultValue="0xd40679a3a234d8421c678d64f4df3308859e8ad07ac95ce4a228aceb96955287" bond={this.bond} placeholder='Content-hash'/>
				is:<br/>
				<Rspan>{this
						.GithubHint
						.entries(this.bond)[0]}</Rspan>
			</div>
		)
	}
};

export class Screenshot3 extends BaseScene {
	render() {
		return (
			<div>
				<InputBond defaultValue='gavofyork' bond={this.bond} placeholder='Name'/>
				<Rimg src={this
					.GithubHint
					.entries(bonds.registry.lookupData(this.bond, 'IMG'))[0]}/>
			</div>
		)
	}
};
