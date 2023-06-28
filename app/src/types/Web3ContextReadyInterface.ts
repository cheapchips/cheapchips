import { Web3Provider } from "./ethersTypes"
import { ChipsJackpot } from "../../../contracts/typechain-types"
import { LinkTokenInterface } from "../../../contracts/typechain-types"
import { ChipStable } from "../../../contracts/typechain-types"
import { Signer } from "ethers"
import TxInfo from "./TxInfo"
import { TxHash, TxStatus } from "./useTransactionTypes"
import Web3ContextInterface from "./Web3ContextInterface"


export default interface Web3ContextReadyInterface extends Web3ContextInterface {
  address: string
  provider: Web3Provider
  signer: Signer
  chipStable: ChipStable
  linkToken: LinkTokenInterface
  linkTokenBalance: string
  jackpot: ChipsJackpot
  chipStableBalance: string
  tx: TxInfo,
  setTxStatus: (status:TxStatus) => void
  setTxHash: (hash: TxHash) => void
  setTxErrorMessage: (err:string) => void,
  setChipStableBalance: (newBalance:string) => void,
  setLinkTokenBalance: (newBalance:string) => void,
}
