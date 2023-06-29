import useContractFunction from "./useContractFunction";
import { etherToWei } from "./utils/web3unitsConversion";
import useWeb3Context from "./useWeb3Context";
import { BigNumber } from "ethers";

interface UseChipStableWriteInterface {
    approve: (amount:number) => void
    mint: () => void
}

interface UseChipStableReadInterface {
    checkAllowance: () => Promise<string>
    getBalance: () => Promise<BigNumber>
}

type UseChipStableInterface = [UseChipStableWriteInterface, UseChipStableReadInterface]


export default function useChipStable():UseChipStableInterface{

    const web3Context = useWeb3Context()
    
    const [performApproveTx] = useContractFunction(web3Context.chipStable.approve)    
    const [performMintTx] = useContractFunction(web3Context.chipStable.mint)

    function approve(amount:number){
        performApproveTx(web3Context.jackpot.address, etherToWei(amount))
    }

    function mint(){
        performMintTx()
    }

    async function getBalance(){
        const balance = await web3Context.chipStable.balanceOf(web3Context.address)
        return balance
    }

    async function checkAllowance(){
        return (await web3Context.chipStable.allowance(web3Context.address, web3Context.jackpot.address)).toString()
    }

    return [{approve, mint}, {checkAllowance, getBalance}]
    
}