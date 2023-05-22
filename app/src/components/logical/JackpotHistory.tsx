


const JackpotHistory = (props:{active: boolean}) => {

    const jackpotHistoryStyles = {

        ctn: `
            grid grid-flow-row grid-flow-rows-[fit,fit]
            w-full h-full
            md:text-xxxs
            lg:text-xxs
            xl:text-sm
            overflow-y-clip
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
            h-screen
            p-2
            gap-2
        `,
        jackpotGameCtn: `
            grid grid-flow-row grid-rows-3
            bg-lightBgActive
            dark:bg-darkBgActive
            2xl:h-20
            xl:h-14
            lg:h-10
            md:h-10
            2xl:p-2
            xl:p-1
            md:p-1
            rounded-md
            2xl:text-sm
            xl:text-xs
            lg:text-xxxs
            md:text-xxxxxs
            border
            border-lightBorder
            dark:border-darkBorder
        `,
        jackpotGameTextTitle: `
            font-normal
        `,
        jackpotGameMiddleRow: `
            flex justify-between
        `,
        jackpotGameTextValue: `
            font-semibold
            px-1
        `,
        jackpotGameTextValueInactive: `
            w-2/3 h-4
            bg-lightBgActive
            dark:bg-darkBgActive
        `,
        textAccentOrange: `
            text-accentColor
        `,
        textAccentBlue: `
            text-accentColor2
        `,
        jackpotDetailsBtn: `
            flex justify-center items-center
            w-1/6 h-full rounded-md
            flex flex-flow-col flex-cols-3 gap-1
            bg-lightBg
            dark:bg-darkBg
            border
            border-lightBorder
            dark:border-darkBorder
        `,
        jackpotDetailsBtnDot: `
            lg:w-1 lg:h-1
            md:w-px md:h-px
            rounded-full
            bg-lightBorder
            dark:bg-darkBorder
        `,
        jackpotDetailsBtnInactive: `

        `,


        participateLose: `
            border-red-600
            dark:border-red-600
        `,
        participateWin: `
            border-lime-400
            dark:border-lime-400
        `,
    }

    function evalAddressParticipationStatus():void {
        // CHeck if address provided in props participated, won, or lost rounds rendered
        // Not participated = default border color
        // Participated but no win = red border color
        // Participated and won = Yellow border color
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

                {/* Game */}
                <div className={jackpotHistoryStyles.jackpotGameCtn}>
                    <span className={jackpotHistoryStyles.jackpotGameTextTitle}>Pool:
                        <span className={jackpotHistoryStyles.jackpotGameTextValue + jackpotHistoryStyles.textAccentOrange}>215</span>
                    </span>
                    <span className={jackpotHistoryStyles.jackpotGameMiddleRow}>
                        <span className={jackpotHistoryStyles.jackpotGameTextTitle}>Ended at: <span className={jackpotHistoryStyles.jackpotGameTextValue + jackpotHistoryStyles.textAccentBlue}>22.05.2023 5:24</span></span>
                        <div className={jackpotHistoryStyles.jackpotDetailsBtn}>
                            <span className={jackpotHistoryStyles.jackpotDetailsBtnDot}></span>
                            <span className={jackpotHistoryStyles.jackpotDetailsBtnDot}></span>
                            <span className={jackpotHistoryStyles.jackpotDetailsBtnDot}></span>
                        </div>
                    </span>
                    <span className={jackpotHistoryStyles.jackpotGameTextTitle}>Id:
                        <span className={jackpotHistoryStyles.jackpotGameTextValue}>3</span>
                    </span>
                </div>
               

                {/* Game */}
                <div className={jackpotHistoryStyles.jackpotGameCtn + jackpotHistoryStyles.participateLose}>
                    <span className={jackpotHistoryStyles.jackpotGameTextTitle}>Pool:
                        <span className={jackpotHistoryStyles.jackpotGameTextValue + jackpotHistoryStyles.textAccentOrange}>40</span>
                    </span>
                    <span className={jackpotHistoryStyles.jackpotGameMiddleRow}>
                        <span className={jackpotHistoryStyles.jackpotGameTextTitle}>Ended at: <span className={jackpotHistoryStyles.jackpotGameTextValue + jackpotHistoryStyles.textAccentBlue}>22.05.2023 5:10</span></span>
                        <div className={jackpotHistoryStyles.jackpotDetailsBtn}>
                            <span className={jackpotHistoryStyles.jackpotDetailsBtnDot}></span>
                            <span className={jackpotHistoryStyles.jackpotDetailsBtnDot}></span>
                            <span className={jackpotHistoryStyles.jackpotDetailsBtnDot}></span>
                        </div>
                    </span>
                    <span className={jackpotHistoryStyles.jackpotGameTextTitle}>Id:
                        <span className={jackpotHistoryStyles.jackpotGameTextValue}>2</span>
                    </span>
                </div>
               

                {/* Game */}
                <div className={jackpotHistoryStyles.jackpotGameCtn + jackpotHistoryStyles.participateWin}>
                    <span className={jackpotHistoryStyles.jackpotGameTextTitle}>Pool:
                        <span className={jackpotHistoryStyles.jackpotGameTextValue + jackpotHistoryStyles.textAccentOrange}>310</span>
                    </span>
                    <span className={jackpotHistoryStyles.jackpotGameMiddleRow}>
                        <span className={jackpotHistoryStyles.jackpotGameTextTitle}>Ended at: <span className={jackpotHistoryStyles.jackpotGameTextValue + jackpotHistoryStyles.textAccentBlue}>22.05.2023 4:55</span></span>
                        <div className={jackpotHistoryStyles.jackpotDetailsBtn}>
                            <span className={jackpotHistoryStyles.jackpotDetailsBtnDot}></span>
                            <span className={jackpotHistoryStyles.jackpotDetailsBtnDot}></span>
                            <span className={jackpotHistoryStyles.jackpotDetailsBtnDot}></span>
                        </div>
                    </span>
                    <span className={jackpotHistoryStyles.jackpotGameTextTitle}>Id:
                        <span className={jackpotHistoryStyles.jackpotGameTextValue}>1</span>
                    </span>
                </div>
               

                {/* Game */}
                <div className={jackpotHistoryStyles.jackpotGameCtn + jackpotHistoryStyles.participateLose}>
                    <span className={jackpotHistoryStyles.jackpotGameTextTitle}>Pool:
                        <span className={jackpotHistoryStyles.jackpotGameTextValue + jackpotHistoryStyles.textAccentOrange}>140</span>
                    </span>
                    <span className={jackpotHistoryStyles.jackpotGameMiddleRow}>
                        <span className={jackpotHistoryStyles.jackpotGameTextTitle}>Ended at: <span className={jackpotHistoryStyles.jackpotGameTextValue + jackpotHistoryStyles.textAccentBlue}>22.05.2023 4:42</span></span>
                        <div className={jackpotHistoryStyles.jackpotDetailsBtn}>
                            <span className={jackpotHistoryStyles.jackpotDetailsBtnDot}></span>
                            <span className={jackpotHistoryStyles.jackpotDetailsBtnDot}></span>
                            <span className={jackpotHistoryStyles.jackpotDetailsBtnDot}></span>
                        </div>
                    </span>
                    <span className={jackpotHistoryStyles.jackpotGameTextTitle}>Id:
                        <span className={jackpotHistoryStyles.jackpotGameTextValue}>0</span>
                    </span>
                </div>
               
            </div>  

        </div>


    )



}


export default JackpotHistory