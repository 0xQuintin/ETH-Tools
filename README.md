# ETH-Tools
A Chrome extension that gives access to technical Ethereum tools. Compatible with Ledger devices.

Currently heavily WIP, will add the actual extension here when it is in a better working state.

Main.js is a "proof of concept" of what i actually have working for the extension.

To run the current avaliable Main.js you will need to install the following packages:

```
npm install @ledgerhq/hw-app-eth
npm install @ledgerhq/hw-transport-node-hid
npm install @ledgerhq/logs
npm install ethers
```

# Planned Features

- Get addresses from custom derivation paths/private keys if you want to expose your seed
- Allow users to send transcations from custom derivation paths and chain (can use Ledger)
- Have tool for signing personal messages
- Build in feature for sending transactions with u2f8 data.
- More...
