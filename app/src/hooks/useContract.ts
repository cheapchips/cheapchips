    
import { useEffect, useState } from "react"
import {ChipStable, ChipStable__factory, ChipsJackpot, ChipsJackpot__factory} from "../../../contracts/typechain-types"
import { ethers } from "ethers"

type Web3Provider = ethers.providers.Web3Provider
// type JsonRpcSigner = ethers.providers.JsonRpcSigner

export default function useContract(
    contractName: "ChipStable" | "ChipsJackpot",
    provider:Web3Provider,
    // signer: JsonRpcSigner
):any {

    const [contract, setContract] = useState<ChipStable | ChipsJackpot>()

    useEffect(() => {
        main()
    })

    const main = async () => {
        await getContract()
    }

    const getContract = async () => {
        let ctrct;
        switch (contractName) {
            case "ChipStable":
                ctrct = ChipStable__factory.connect("0xCb121efF8eAdB7Ab2CaA0660cFD02e5BE4C946b6", provider)
                break;
            case "ChipsJackpot":
                ctrct = ChipsJackpot__factory.connect("0xf082812C3De7a8d5014f1F748bb75046F6143A53", provider)
            setContract(ctrct)
        }
    }

    return contract


}