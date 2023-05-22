import ArchivedJackpot from "./ArchivedJackpot"

const JackpotArchives = (props:{active: boolean}) => {

    const testDate = (new Date()).toLocaleDateString('en-US')

    const jackpotHistoryStyles = {

        ctn: `
            grid grid-flow-row grid-flow-rows-[fit,fit]
            w-full h-full
            md:text-xxxs
            lg:text-xxs
            xl:text-sm
            overflow-y-hidden
            content-start
            `,
        titleCtn: `
            flex h-fit
            xl:p-2
            lg:p-1
            border-b
            border-lightBorder
            dark:border-darkBorder
        `,
        titleText: `
            p-1
            font-semibold
        `,
        titleTextInactive: `
            w-1/3
            xl:h-7 lg:h-4 md:h-3
            bg-lightBgActive
            dark:bg-darkBgActive
            rounded-md
        `,
        jackpotCtn: `
            overflow-y-auto
            flex flex-col
            h-auto
            p-2
            gap-2
        `,
    }

    return (

        <div className={jackpotHistoryStyles.ctn}>

            {/* Title */}
            <div className={jackpotHistoryStyles.titleCtn}>
                {props.active
                ?
                <span className={jackpotHistoryStyles.titleText}>Game history</span>
                :
                <span className={jackpotHistoryStyles.titleTextInactive}></span>
            }
            </div>

            {/* Game list */}
            <div className={jackpotHistoryStyles.jackpotCtn}>

                <ArchivedJackpot
                    userAddress="test_addr"
                    winnerAddress="winner"
                    prizePool={200}
                    endTime={testDate}
                    roundId={2}
                    {...props}
                />
               
                
                <ArchivedJackpot
                    userAddress="winner"
                    winnerAddress="winner"
                    prizePool={325}
                    endTime={testDate}
                    roundId={1}
                    {...props}
                />
               
            </div>  

        </div>


    )



}


export default JackpotArchives