import { derivationPath } from "./main.js";
import { utils } from "ethers";
import { provider } from "./main.js";

export const sendUTF = async (_signer, _connectedAddress, _targetAddress, _value, _message) => {

    let _gasLimit;
    let _currentMaxFee;
    let _currentMaxPriority;

    await provider.getFeeData().then((data) => {
        _currentMaxFee = data.maxFeePerGas;
        _currentMaxPriority = data.maxPriorityFeePerGas;
    });

    let UTF8Tx = {
        type: 2,
        chainId: 5,
        from: _connectedAddress,
        to: _targetAddress,
        value: utils.hexlify(_value),
        data: utils.hexlify(utils.toUtf8Bytes(_message)),
        nonce: await provider.getTransactionCount(_connectedAddress),
        gasLimit: _gasLimit,
        maxFeePerGas: _currentMaxFee,
        maxPriorityFeePerGas: _currentMaxPriority
    }

    await provider.estimateGas(UTF8Tx)
    .then(data => {
        _gasLimit = data._hex;
    });

    UTF8Tx = {
        type: 2,
        chainId: 5,
        from: _connectedAddress,
        to: _targetAddress,
        value: utils.hexlify(_value),
        data: utils.hexlify(utils.toUtf8Bytes(_message)),
        nonce: await provider.getTransactionCount(_connectedAddress),
        gasLimit: _gasLimit,
        maxFeePerGas: _currentMaxFee,
        maxPriorityFeePerGas: _currentMaxPriority
    }



    const unsignedUTFTx = utils.serializeTransaction(UTF8Tx).substring(2);
    const signedUTFTx = await _signer.signTransaction(derivationPath, unsignedUTFTx, null);
    signedUTFTx.r = "0x"+signedUTFTx.r;
    signedUTFTx.s = "0x"+signedUTFTx.s;
    signedUTFTx.v = parseInt(signedUTFTx.v);
    signedUTFTx.from = _connectedAddress;
    const readyUTFTx = utils.serializeTransaction(UTF8Tx, signedUTFTx);
    await provider.sendTransaction(readyUTFTx)
    .then(data => {
        console.log("Transaction hash:",data.hash);
    });
}

export default sendUTF;
