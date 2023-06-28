import { Web3Provider } from "./ethersTypes"
import { ChipsJackpot } from "../../../contracts/typechain-types"
import { LinkTokenInterface } from "../../../contracts/typechain-types"
import { ChipStable } from "../../../contracts/typechain-types"
import { TxStatus, TxHash } from "./useTransactionTypes"
import { Signer, providers } from "ethers"

type TxInfo = {
  status: TxStatus
  hash: TxHash
  errorMessage?: string
}

export default interface Web3ContextInterface {
  address: string | undefined
  provider: Web3Provider | undefined
  signer: Signer | undefined
  chipStable: ChipStable | undefined
  linkToken: LinkTokenInterface | undefined
  linkTokenBalance: string | undefined
  jackpot: ChipsJackpot | undefined
  chipStableBalance: string | undefined
  tx: TxInfo,
  setTxStatus: (status:TxStatus) => void
  setTxHash: (hash: TxHash) => void
  setTxErrorMessage: (err:string) => void,
  setChipStableBalance: (newBalance:string) => void,
  setLinkTokenBalance: (newBalance:string) => void,
}
