const {
	snapAndSave
} = require('../utils');

const path = require('path');

exports.warmup = async function warmup({
	Page
}, baseUrl, outputPath) {
	const url = `${baseUrl}/#/apps`;
	console.log(url);

	// body...
	await Page.navigate({
		url
	});

	await Page.reload()
	const tutPath = path.join(outputPath, '0')
	await snapAndSave({Page}, tutPath, 0);
};
