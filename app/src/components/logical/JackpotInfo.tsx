
const JackpotInfo = (props: {active:boolean,prizePool:number,jackpotRoundId:number}) => {

    const jackpotInfoStyles = {
        mainCtn: `
            grid grid-flow-row
            grid-rows-[auto,auto,0.9fr]
            w-full h-full
            xl:text-sm
            lg:text-xxs
            md:text-xxxs
        `,
        titleCtn: `
            flex w-full h-fit
            border-b
            border-lightBorder
            dark:border-darkBorder
            xl:p-2
            md:p-1
        `,
        titleText: `
            font-semibold
            lg:p-1
            md:p-0
        `,
        titleTextInactive: `
            w-1/5
            lg:h-7
            md:h-3
            rounded-md
        `,

        infoCtn: `
            w-full grid grid-cols-2 h-fit
            border-b
            border-lightBorder
            dark:border-darkBorder
            lg:p-2
            md:p-1
        `,
        infoContent: `
            p-1
        `,
        infoTitle: `
            font-semibold
            px-1
        `,
        infoValue: `
            font-extrabold
            text-accentColor
            px-1
        `,
        infoInactive: `
            w-1/3
            lg:h-6
            md:h-4
            rounded-md
        `,

        poolBarCtn: ``,
        poolBar: ``,
        poolBarInactive: ``,

        inactiveBg: `
            bg-lightBgActive
            dark:bg-darkBgActive
        `,
    }

    return (
        <div className={jackpotInfoStyles.mainCtn}>
            
            <div className={jackpotInfoStyles.titleCtn}>
                {props.active ? 
                    <span className={jackpotInfoStyles.titleText}>Round</span>
                :
                    <span className={jackpotInfoStyles.titleTextInactive + jackpotInfoStyles.inactiveBg}></span>    
                }
            </div>

            <div className={jackpotInfoStyles.infoCtn}>
                {props.active
                ?
                    <>
                    <span className={jackpotInfoStyles.infoTitle}>Prize pool:
                        <span className={jackpotInfoStyles.infoValue}>{props.prizePool}</span>
                    </span>
                    <span className={jackpotInfoStyles.infoTitle}>Round id:
                        <span className={jackpotInfoStyles.infoValue}>{props.jackpotRoundId}</span>
                    </span>
                    </>
                :
                    <>
                        <span className={jackpotInfoStyles.infoInactive + jackpotInfoStyles.inactiveBg}></span>
                        <span className={jackpotInfoStyles.infoInactive + jackpotInfoStyles.inactiveBg}></span>
                    </>
                }
            </div>

            <div className={jackpotInfoStyles.poolBarCtn}>

                <div className={jackpotInfoStyles.poolBar}></div>

            </div>

        </div>
    )

}



export default JackpotInfo