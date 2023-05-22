


const ArchivedJackpot = (props: {
    userAddress: string,
    winnerAddress: string,
    prizePool: number,
    endTime: string,
    roundId: number,
    active: boolean
}) => {

    
    const archivedJackpotStyles = {
        ctn: `
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
    if(!props.active){
        return <></>
    }
    return (
        <div className={archivedJackpotStyles.ctn + (props.userAddress === props.winnerAddress ? archivedJackpotStyles.participateWin : archivedJackpotStyles.participateLose)}>
            <span className={archivedJackpotStyles.jackpotGameTextTitle}>Pool:
                <span className={archivedJackpotStyles.jackpotGameTextValue + archivedJackpotStyles.textAccentOrange}>{props.prizePool}</span>
            </span>
            <span className={archivedJackpotStyles.jackpotGameMiddleRow}>
                <span className={archivedJackpotStyles.jackpotGameTextTitle}>Ended: <span className={archivedJackpotStyles.jackpotGameTextValue + archivedJackpotStyles.textAccentBlue}>{props.endTime}</span></span>
                <div className={archivedJackpotStyles.jackpotDetailsBtn}>
                    <span>. . .</span>
                </div>
            </span>
            <span className={archivedJackpotStyles.jackpotGameTextTitle}>Id:
                <span className={archivedJackpotStyles.jackpotGameTextValue}>{props.roundId}</span>
            </span>
        </div>   
    )

}

export default ArchivedJackpot