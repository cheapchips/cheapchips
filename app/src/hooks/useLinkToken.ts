import { etherToWei, weiToEther } from "./utils/web3unitsConversion";
import useContractFunction from "./useContractFunction";
import useWeb3Context from "./useWeb3Context";

interface UseLinkTokenWriteInterface {
    approve: (amount:number) => void
}

interface UseLinkTokenReadInterface {
    checkAllowance: () => Promise<string>
    checkBalance: () => Promise<string>
}


type UseLinkTokenInterface = [UseLinkTokenWriteInterface, UseLinkTokenReadInterface]


export default function useLinkToken():UseLinkTokenInterface{

    const web3Context = useWeb3Context()

    const [performApproveTx] = useContractFunction(web3Context.linkToken.approve)
    
    function approve(amount:number){
        const {jackpot} = web3Context
        performApproveTx(jackpot.address, etherToWei(amount))
    }

    async function checkAllowance(){
        return weiToEther(await web3Context.linkToken.allowance(web3Context.address, web3Context.jackpot.address))
    }

    async function checkBalance() {
        return weiToEther(await web3Context.linkToken.balanceOf(web3Context.address))
    }

    return [
        {approve},
        {checkAllowance, checkBalance}
    ]    
}