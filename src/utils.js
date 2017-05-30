const file = require('fs-extra');
const path = require('path');
const wait = require('wait-promise');

const {delay, format} = require('./structure.json');

exports.snapAndSave = async function snapAndSave({Page}, outputPath, outname) {
	await wait.sleep(delay);

	const screenshot = await Page.captureScreenshot({format});

	const buffer = new Buffer(screenshot.data, 'base64');

	await file.ensureDir(outputPath);

	const finalOutputPath =
		path.join(outputPath, `${outname}.${format}`);

	await file.writeFile(finalOutputPath, buffer, 'base64');

	console.log(`${finalOutputPath} saved`);
};
