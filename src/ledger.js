import Eth from "@ledgerhq/hw-app-eth";
import TransportNodeHID from "@ledgerhq/hw-transport-node-hid";
import derivationPath from "./main.js";
export let ledgerAddress;
export let ledgerSigner;


export const connectLedger = async () => {

    const transport = await TransportNodeHID.default.create();

    ledgerSigner = new Eth.default(transport);
    const getAddress = await ledgerSigner.getAddress(derivationPath, false)
                        .then(data => {
                            ledgerAddress = data.address;
                        });

    console.log("Eth Address:", ledgerAddress);
}

export default connectLedger;