import { useState, useEffect } from "react"
import ModalSkeleton from "../Modal"
import { ethers } from "ethers"
import { LinkTokenInterface, LinkTokenInterface__factory, ChipsJackpot } from "../../../../../contracts/typechain-types"
import useLinkToken from "../../../hooks/useLinkToken"

const BuyTokensModalTESTNET = (
    props: {
        title: string,
        onClickClose: () => void,
        provider:ethers.providers.Web3Provider
        address:string
        jackpot:ChipsJackpot
    }
) => {

    const [link, setLink] = useState<LinkTokenInterface>()
    const [linkBalance, setLinkBalance] = useState<number>()

    const [setupLinkToken, writeLinkToken, readLinkToken] = useLinkToken()

    useEffect(() => {
        const linkToken = LinkTokenInterface__factory.connect("0x326C977E6efc84E512bB9C30f76E30c160eD06FB", props.provider)
        // 
        // setupLinkToken(linkToken)
    }, [])

    useEffect(() => {
        if(linkBalance) return
        updateLINKBalance()
    }, [link])

    useEffect(() => {
        updateLINKBalance()
    }, [linkBalance])

    const updateLINKBalance = async () => {
        const bal = await link?.balanceOf(props.address)
        if(!bal) return
        const balance = ethers.utils.formatUnits(bal, "ether")
        console.log('parsed ', balance)
        setLinkBalance(+balance)
    }

    const styles = {
        // wrappers, layout only
        wrapper: `
            grid grid-flow-col grid-cols-[1fr,1fr] grow
            justify-center
            px-4 pb-4 gap-4
            text-lightText
            dark:text-darkText
            md:text-xxxs
            lg:text-xxs
            xl:text-sm
            font-content
        `,
        verticalContentWrapper: `
            flex flex-col
            `,
        verticalContentTitle: `
            flex justify-center items-center
            px-2 py-4
        `,
        verticalContentMain: `
            flex justify-center items-center grow flex-col gap-4
            border border-lightBorder dark:border-darkBorder
            rounded-md
            bg-lightBg
            dark:bg-darkBg
            p-2
        `,

        // left panel (Chip minter)
        button: `
            flex justify-center items-center
            py-2 px-4
            border
            border-lightBorder
            dark:border-darkBorder
            rounded-md
            hover:bg-lightBgActive
            hover:dark:bg-darkBgActive
            active:opacity-40
        `,

        // right panel (LINK deposit)
        depositCtn: `
            flex flex-col
            justify-start items-start
            xl:w-3/4 xl:h-1/4
            lg:w-4/5 lg:h-1/2
            md:w-5/6 md:h-2/3
            rounded-md
            border border-lightBorder dark:border-darkBorder
        `,
        depositTitle: `
            flex w-full h-fit
            border-b border-lightBorder dark:border-darkBorder
            p-2
        `,
        depositInput: `
            text-xl
            flex w-full h-full
            bg-lightBg
            dark:bg-darkBg
            border-b border-lightBorder dark:border-darkBorder
            p-2
        `,
        depositBalanceInfo: `
            flex w-full h-full
            justify-start items-center content-center
            p-2
        `,
    }

    const VerticalContentPanel = (props: {title:string, children:any}) => {
        return (
            <div className={styles.verticalContentWrapper}>
                <div className={styles.verticalContentTitle}>
                    {props.title}
                </div>

                <div className={styles.verticalContentMain}>
                    {props.children}
                </div>
            </div>
        )
    }

    const LinkDepositPanel = (props:{
        balance:number | undefined,
        link:LinkTokenInterface | undefined,
        jackpot:ChipsJackpot,
        address:string
    }) => {

        const [val, setVal] = useState<number>()
        const [allowance, setAllowance] = useState<any>()

        const submitDeposit = async (value:number | undefined) => {
            if(!value || !linkBalance) return
            if(value > linkBalance){
                console.log('not enough balance!'); return
            }
            console.log(value)
            await props.jackpot.depositFees(ethers.utils.parseEther(value.toString()))
        }

        return (
            <>
                <div className={styles.depositCtn}>
                    <span className={styles.depositTitle}>LINK amount to deposit: </span>
                    <input className={styles.depositInput} type="number" min="0" placeholder="0" onChange={(e) => setVal(+e.target.value)} />
                    {!props.balance
                    ?
                    <span className={styles.depositBalanceInfo}>LINK balance: (...)</span>
                    :
                    <span className={styles.depositBalanceInfo}>LINK balance: {props.balance}</span>
                }

                </div>
                <button onClick={() => submitDeposit(val)} className={styles.button}>Deposit</button>
            </>
        )
    }


    return (
        <ModalSkeleton {...props} size="Big" >
            <div className={styles.wrapper}>

                <VerticalContentPanel title="Get chips and LINK">

                    <span>Claim free chips here</span>
                    <button className={styles.button}>CHIPS minter</button>

                    <span>Claim free link here</span>
                    <button className={styles.button}>LINK faucet</button>

                </VerticalContentPanel>

                <VerticalContentPanel title="Deposit Link (service fee)">

                    <LinkDepositPanel balance={linkBalance} jackpot={props.jackpot} link={link} address={props.address} />

                </VerticalContentPanel>

            </div>
        </ModalSkeleton>
    )

}




export default BuyTokensModalTESTNET


