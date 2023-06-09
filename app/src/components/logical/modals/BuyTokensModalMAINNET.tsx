import ModalSkeleton from "../ModalSkeleton"
import BuyChipStable from "../BuyChipStable"

const BuyTokensModal = (
    props: {
        title: string,
        size: "Big" | "Medium" | "Small",
        onClickClose: () => void,
    }
) => {

    const buyTokensStyles = {
        // wrappers, layout only
        wrapper: `
            grid grid-flow-col grid-cols-[1fr,1fr] grow
            justify-center
            px-4 pb-4 gap-4
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
            p-2
        `,
    }

    return (
        <ModalSkeleton {...props}>

            <div className={buyTokensStyles.wrapper}>
                
                
                <div className={buyTokensStyles.verticalContentWrapper}>
                    
                    <div className={buyTokensStyles.verticalContentTitle}>
                        BUY CHIPS
                    </div>
                    
                    <div className={buyTokensStyles.verticalContentMain}>
                        <BuyChipStable />
                    </div>
                
                
                </div>
                
                <div className={buyTokensStyles.verticalContentWrapper}>
                    
                    <div className={buyTokensStyles.verticalContentTitle}>
                        BUY SERVICE FEE (LINK)
                    </div>
                    
                    <div className={buyTokensStyles.verticalContentMain}>
                        ...
                    </div>
                    
                    
                    
                </div>
                
                
                
            </div>

        </ModalSkeleton>
    )

}

export default BuyTokensModal