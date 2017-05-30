const {
	snapAndSave
} = require('../utils');

const {
	storageId,
	width,
	height,
	token
} = require('../structure.json');

exports.prepare = async function prepare({
	DOM,
	Emulation,
	Network,
	Page,
	Runtime,
	DOMStorage
}, baseUrl, outputPath) {

	const url = `${baseUrl}/#/auth?token=${token}`
	console.log(url);
	// Enable events on domains we are interested in.
	await Page.enable();
	await DOM.enable();
	await Network.enable();
	await DOMStorage.enable();

	// Set up viewport resolution, etc.
	const deviceMetrics = {
		width,
		height,
		deviceScaleFactor: 0,
		mobile: false,
		fitWindow: false
	};

	await Emulation.setDeviceMetricsOverride(deviceMetrics);

	await Emulation.setVisibleSize({
		width,
		height
	});

	// Navigate to auth page
	await Page.navigate({
		url
	});

	// set cookie
	await snapAndSave({
		Page
	}, outputPath, `auth`)

	await Promise.all([
		disableFirstRun({DOMStorage}),
		disableTooltips({DOMStorage}),
		setViews({DOMStorage})
	]);

};

function disableFirstRun({
	DOMStorage
}) {
	return DOMStorage.setDOMStorageItem({
		storageId,
		key: '_parity::showFirstRun',
		value: 'false'
	})
}

function disableTooltips({
	DOMStorage
}) {
	return DOMStorage.setDOMStorageItem({
		storageId,
		key: 'tooltips',
		value: '{\"state\":\"off\"}'
	})
};

function setViews({
	DOMStorage
}) {
	return DOMStorage.setDOMStorageItem({
		storageId,
		key: 'views',
		value: '{"home":{"active":true},"accounts":{"active":true},"addresses":{"active":false},"apps":{"active":true},"contracts":{"active":false},"status":{"active":false},"signer":{"active":true},"settings":{"active":true}}'
	})
};
