import { BigNumber, providers, utils } from "ethers";
import { connectLedger, ledgerAddress, ledgerSigner } from "./ledger.js";
import sendUTF from "./UTFtx.js";

export let connectedAddress;
let toAddress = "0x4289eA7F182927557E3d06eBa5b49b6849a77CF2";
let signer;
export let derivationPath = "44'/60'/0'/0/0";
const APIKey = "bV4BZip2EDoW9h7hnRCVzhsrVb1hptjD";
export const provider = new providers.AlchemyProvider("goerli", APIKey);

const main = async () => {

    await connectLedger();
    connectedAddress = ledgerAddress;
    signer = ledgerSigner;
    console.log(connectedAddress);

    sendUTF(signer, connectedAddress, toAddress, 1, "hello");

}

main();

export default derivationPath;