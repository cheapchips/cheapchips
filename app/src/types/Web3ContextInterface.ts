import { Web3Provider } from "./ethersTypes"
import { ChipsJackpot } from "../../../contracts/typechain-types"
import { LinkTokenInterface } from "../../../contracts/typechain-types"
import { ChipStable } from "../../../contracts/typechain-types"
import { Signer } from "ethers"


export default interface Web3ContextInterface {
  address: string | undefined
  provider: Web3Provider | undefined
  signer: Signer | undefined
  chipStable: ChipStable | undefined
  linkToken: LinkTokenInterface | undefined
  linkTokenBalance: string | undefined
  jackpot: ChipsJackpot | undefined
  chipStableBalance: string | undefined
}
