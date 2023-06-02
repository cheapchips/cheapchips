import { BigNumber, ethers, utils } from "ethers";

export function etherToWei(n:number){
    return utils.parseEther(n.toString())
}

export function weiToEther(n:BigNumber){
    return ethers.utils.formatUnits(n.toString(), "ether").toString()
}

