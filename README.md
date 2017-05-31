# Screenshot Generator for Skeleton dapp Tutorial.

## Related Wiki:

https://github.com/paritytech/parity/wiki/Dapp-Tutorial

## To install:

```
$ npm install
```

## To build:

```
$ npm run watch
```

Files will be build into `dist/`. Just symlink that dir into your dapps path.

## To generate screenshots:

Open 3 terminal, both `cd`'ed to this project directory.

On terminal 1, do:

```
$ npm run start:chrome // or npm run start:chromium
```

On terminal 2, do:

```
$ npm run watch
```


Then on terminal 3, do:

```
$ npm run screenshot
```

The runner only capture screenshot of the first layer. It will be better to write E2E test for each Tutorial then for each test take screenshot. But writing test would take more than 48H...

# LICENSE

RTFS
	? UTFS
		? MIT
		: LGPL 3.0
	: GPL v3.0
