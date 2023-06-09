import { useEffect } from "react"
import chipsLogo from "../../assets/logo.png"

const BuyChipStable = () => {

    useEffect(() => {
    }, [])

    const styles = {
        wrapper: `
            flex flex-col
            w-full h-fit
            p-2
        `,
        swapIconBetweenBlocks: `
            w-12 h-12 rounded-full
            self-center
            bg-lightBg
            dark:bg-darkBgActive
            m-2
            border
        `,

        // entire input block section
        inputBlock: `
            grid grid-flow-row grid-rows-[1.75fr,1fr]
            w-full h-40
            rounded-md
            bg-lightBg
            dark:bg-darkBgActive
        `,
        inputBlockTopContentCtn: `
            flex flex-row
        `,
        valueInputCtn: `
            flex justify-start items-center
            w-4/5 h-full
            border
        `,
        valueInput: `
            bg-lightBg
            dark:bg-darkBg
            w-full h-full
            p-2
        `,
        coinDropdownCtn: `
            flex justify-center items-center
            w-1/5 h-full p-2
            border
        `,


        inputBlockBottomContentCtn: `
            flex flex-row justify-between items-center
        `,

    }

    const CurrencyInputBlock = (props:{coinLogoPath:string}) => {

        return (
             <div className={styles.inputBlock}>

                <div className={styles.inputBlockTopContentCtn}>
                
                    <div className={styles.valueInputCtn}>
                        <input className={styles.valueInput} type="number" />
                    </div>

                    <div className={styles.coinDropdownCtn}>
                        <img className="w-10 h-10 -rotate-12 aspect-square" src={props.coinLogoPath}></img>
                    </div>

                </div>

                <div className={styles.inputBlockBottomContentCtn}>
                    <div className="p-2 border">${""}</div>
                    <div className="p-2 border">BALANCE:{""}</div>
                </div>

            </div>
        )        
    }

    return (
        <>
            <CurrencyInputBlock
                coinLogoPath={chipsLogo}
                />

            <div className={styles.swapIconBetweenBlocks}></div>
            
            <CurrencyInputBlock
                coinLogoPath={""}
            />
        </>
    )


}


export default BuyChipStable





