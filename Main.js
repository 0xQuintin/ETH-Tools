import { listen } from "@ledgerhq/logs";
import Eth from "@ledgerhq/hw-app-eth";
import { BigNumber, providers, utils } from "ethers";
import TransportNodeHID from "@ledgerhq/hw-transport-node-hid";

//def
let derivationPath = "44'/60'/0'/0/0";
let gwei;
let gas;
let valueToSend;
let currentGasCost;
let currentMaxFee;
let currentMaxPriority;
let getFeeData;
const targetAddress = "0x4289eA7F182927557E3d06eBa5b49b6849a77CF2";

const APIKey = "bV4BZip2EDoW9h7hnRCVzhsrVb1hptjD";
const provider = new providers.AlchemyProvider("goerli", APIKey);

//functions
const main = async () => {
    const transport = await TransportNodeHID.default.create();

    //listen(log => console.log(log))

    let ethAddress;
    const appEth = new Eth.default(transport);
    const getAddress = await appEth.getAddress(derivationPath, false)
                        .then(data => {
                            ethAddress = data.address;
                        });

    console.log("Eth Address:", ethAddress);

    await appEth.getAddress(derivationPath, true);

    console.log("Address verified, now using Ethers to show balance of address.");
    let ledgerBalance;
    const getBalance = await provider.getBalance(ethAddress)
                        .then(info => {
                            ledgerBalance = BigNumber.from(info._hex);
                        })

    console.log("Creating a transaction, signing with Ledger, then using Ethers provider to send the signed transaction.");

    getFeeData = await provider.getFeeData()
    .then((feeData) => {
        currentGasCost = BigNumber.from(feeData.gasPrice);
        currentMaxFee = feeData.maxFeePerGas;
        currentMaxPriority = feeData.maxPriorityFeePerGas;
    });

    gwei = currentMaxFee.add(currentMaxPriority);
    gas = gwei.mul(21000);
    valueToSend = ledgerBalance.sub(gas);

    let tx = {
        type: 2,
        chainId: 5,
        from: ethAddress,
        to: targetAddress,
        value: valueToSend,
        nonce: await provider.getTransactionCount(ethAddress),
        gasLimit: 0x5208,
        maxFeePerGas: currentMaxFee,
        maxPriorityFeePerGas: currentMaxPriority
    }
    
    const unsignedTx = utils.serializeTransaction(tx).substring(2);
    const signedTx = await appEth.signTransaction(derivationPath, unsignedTx, null);
    signedTx.r = "0x"+signedTx.r;
    signedTx.s = "0x"+signedTx.s;
    signedTx.v = parseInt(signedTx.v);
    signedTx.from = ethAddress;
    const readyTx = utils.serializeTransaction(tx, signedTx);
    await provider.sendTransaction(readyTx)
    .then(data => {
        console.log("Transaction hash:",data.hash);
    })
    
}

main();
