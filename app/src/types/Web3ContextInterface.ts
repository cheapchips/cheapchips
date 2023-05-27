import { Web3Provider } from "./ethersTypes"
import { ChipsJackpot } from "../../../contracts/typechain-types"
import { LinkTokenInterface } from "../../../contracts/typechain-types"
import { ChipStable } from "../../../contracts/typechain-types"
import { Signer } from "ethers"


export default interface Web3ContextInterface {
  address: string
  provider: Web3Provider
  signer: Signer
  chipStable: ChipStable
  linkToken: LinkTokenInterface
  jackpot: ChipsJackpot
}
