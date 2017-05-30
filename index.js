/*
// Navigate to http://parity.web3.site:8180/#/app/mydapp
// Read structure.json
	// SYNC LOOP for each tuts:
		// SYNC LOOP for each screenshot
			SYNC Write into scene.json the current (tut+1) and current ss

			SYNC Run Webpack

			SYNC RELOAD THE PAGE

			SYNC WAIT for delay

			SYNC Take Screenshot

			SYNC Save screenshot
*/

const CDP = require('chrome-remote-interface');

const file = require('fs-extra');
const path = require('path');
const wait = require('wait-promise');

const {
	tuts,
	token,
	delay
} = require('./src/structure.json');

if(!token) {
	console.error("ERR: TOKEN NOT FOUND!");
	console.log("Please generate a new Parity token for the headless browser using:");

	console.log("\tparity signer new-to ken\n");
	console.log(`Then copy it into src/structure.json`);
	process.exit(1);
}

const baseUrl = 'http://parity.web3.site:8180';

// Then the tutorial screenshot at:
const url = `${baseUrl}/#/app/mydapp`;
console.log(url);

const sceneJSONPath = path.resolve(__dirname, 'src/scene.json');

const outputPath = path.resolve(__dirname, 'screenshot');

const {
	prepare,
	warmup
} = require('./src/runner');

const {
	snapAndSave
} = require('./src/utils');

// Start the Chrome Debugging Protocol
CDP(main)
	.on('error', err => {
		console.error('Cannot connect to browser:', err);
	});

async function main(client) {
	try {
		await prepare(client, baseUrl, outputPath);

		await warmup(client, baseUrl, outputPath)

		// Extract used DevTools domains.
		const {
			DOM,
			Emulation,
			Network,
			Page,
			Runtime,
			DOMStorage
		} = client;

		let tut = 1;
		let ss = 0;

		await file.writeJson(sceneJSONPath, {
			tut,
			ss
		});

		await Page.navigate({
			url
		});

		await Page.reload()
		// Wait for page load event to take screenshot
		Page.loadEventFired(async() => {

			if (tut <= tuts.length) {
				const tutPath = `${outputPath}/${tut}`;
				await snapAndSave(client, tutPath, ss);
			}

			const ssCount = tuts[tut-1];
			if(ssCount) {
				if(ss === ssCount-1) {
					tut++;
					ss = 0;
				} else {
					ss++;
				}
				await file.writeJson(sceneJSONPath, {
					tut,
					ss
				});

				await Page.reload()
			} else {
				await file.writeJson(sceneJSONPath, {
					tut: 1,
					ss : 0
				});
				console.log("COMPLETE! :)");
				client.close();
			}
		});
	} catch(e) {
		console.error(e);
		process.exit(1);
	}
}
