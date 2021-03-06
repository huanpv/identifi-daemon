#  [![Build Status](https://secure.travis-ci.org/identifi/identifi-daemon.png?branch=master)](http://travis-ci.org/identifi/identifi-daemon)

# Identifi daemon

https://www.npmjs.com/package/identifi-daemon

Identifi daemon maintains identity and message indexes on IPFS. [Merkle-btree](https://github.com/mmalmi/merkle-btree) is used for indexing.

Note: Using [identifi-angular](https://github.com/identifi/identifi-angular) is probably sufficient, unless you want to maintain your own indexes.

## Install

```sh
$ npm install -g identifi-daemon
```

Currently requires a running [IPFS daemon](https://ipfs.io/docs/install/), as the embedded [js-ipfs](https://github.com/ipfs/js-ipfs) does not support IPNS.


## Usage

```cli
identifid
```

## License

MIT © [Martti Malmi](https://github.com/mmalmi)
