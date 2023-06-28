import { Signer } from "ethers";
import { PropsWithChildren } from "react";
import { Web3Provider } from "./ethersTypes";
import WalletState from "./WalletState";

type Web3ContextProviderInterface = PropsWithChildren<{
    walletState: WalletState,
    web3Provider: Web3Provider | undefined,
    web3Signer: Signer | undefined
}>

export default Web3ContextProviderInterface

