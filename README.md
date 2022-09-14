# Equiped
A Chrome extension that gives access to technical Ethereum tools. Compatible with Ledger devices.

Currently heavily WIP, will add the actual extension here when it is in a better working state.

Main.js is a "proof of concept" of what i actually have working for the extension.

To run the current avaliable Main.js you will need to install the following packages:

```
npm install @ledgerhq/hw-app-eth ethers @ledgerhq/hw-transport-node-hid @ledgerhq/logs
```

# Working Features
- Completely custom ETH derivation path address generation.
- sending funds from custom derivation paths.
- Sending UTF-8 data in transactions.

# Planned Features

- Get addresses from custom derivation paths/private keys if you want to expose your seed
- Allow users to send transcations from custom derivation paths and chain (can use Ledger)
- Have tool for signing personal messages
- Allow for sending private transactions with Flash Bots, this will allow you to hide your transactions from MEV.
- More...
