import { useState, useEffect, useContext, useTransition } from "react"
import ModalSkeleton from "../ModalSkeleton"
import Web3Context from "../../../contexts/Web3Context"
import useJackpot from "../../../hooks/useJackpot"
import useLinkToken from "../../../hooks/useLinkToken"
import chainlink_logo from "../../../assets/chainlink_logo.png"
import TransactionModal from "./TransactionModal"

const BuyTokensModalTESTNET = (
    props: {
        title: string,
        onClickClose: () => void,
    }) => {

    const web3 = useContext(Web3Context)
    
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
        chainlinkLogo: `
            w-12 h-12 aspect-square
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
        sufficientAllowance: `
            border border-green-500 dark:border-green-500
        `,
        insufficientAllowance: `
            border border-orange-600 dark:border-orange-600
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

    const LinkDepositPanel = () => {

        const [val, setVal] = useState<number>()
        const [deposit, setDeposit] = useState<number>()
        const [allowance, setAllowance] = useState<number>()
        const [writeLinkToken, readLinkToken] = useLinkToken()
        const [writeJackpot, readJackpot] = useJackpot()
        const [readyToDeposit, setReadyToDeposit] = useState<boolean>(false)

        useEffect(() => {
            update() // initial data fetch
        }, [readJackpot])

        const update = async () => {
            await getCurrentAllowance()
            await getCurrentDeposit()
        }
        
        const getCurrentAllowance = async ():Promise<void> => {
            const allow = await readLinkToken.checkAllowance()
            !allow ? setAllowance(0) : setAllowance(allow)
        }

        const getCurrentDeposit = async ():Promise<void> => {
            const deposit = await readJackpot.checkFeesBalance()
            !deposit ? setDeposit(0) : setDeposit(deposit)
        }

        const submitDeposit = async (value:number | undefined) => {
            if(!value || !web3.linkTokenBalance) return
            if(value > +web3.linkTokenBalance) return 
            if(allowance! < value){
                writeLinkToken.approve(value)
                return
            }
            writeJackpot.depositFees(value)
        }

        return (
            <>
                <img className={styles.chainlinkLogo} src={chainlink_logo} alt="ChainlinkLogo" />
                <div className={styles.depositCtn}>
                    <span className={styles.depositTitle}>LINK amount to deposit: </span>
                    <input className={styles.depositInput} type="number" min="0" placeholder="0" onChange={(e) => setVal(+e.target.value)} />
                    <span className={styles.depositBalanceInfo}>Balance: {!web3.linkTokenBalance ? "..." : web3.linkTokenBalance}</span>
                </div>
                <span>Current allowance: {!allowance ? "..." : allowance} </span>
                <span>Current deposit: {!deposit ? "..." : deposit}</span>
                <button onClick={() => submitDeposit(val)} className={styles.button + ((readyToDeposit || allowance! >= val!) ? styles.sufficientAllowance : styles.insufficientAllowance)}>Deposit</button>
                <span className="w-1/2">{(!val || allowance! >= val!) ? "" : "You will need to allow this amount before you can deposit it"}</span>
            </>
        )
    }


    return (
        <>
        <ModalSkeleton {...props} size="Big" >
            <div className={styles.wrapper}>

                <VerticalContentPanel title="Get chips and LINK">
                    <span>Claim free chips here</span>
                    <button className={styles.button}>CHIPS minter</button>
                    <span>Claim free link here</span>
                    <button onClick={() => window.open("https://faucets.chain.link/mumbai")} className={styles.button}>LINK faucet</button>
                </VerticalContentPanel>

                <VerticalContentPanel title="Deposit Link (service fee)">
                    <LinkDepositPanel/>
                </VerticalContentPanel>

            </div>
        </ModalSkeleton>
        <TransactionModal txTitle="Test" onClickClose={() => {}}/>
        </>
    )

}




export default BuyTokensModalTESTNET


