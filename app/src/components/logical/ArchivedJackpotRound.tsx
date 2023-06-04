import ArchivedJackpot from "../../types/ArchivedJackpot"
import SvgIcon from "../layout/SvgIcon"

const ArchivedJackpotRound = (props:ArchivedJackpot) => {

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
        jackpotGameLastRow: `
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
            border border-lightBorder dark:border-darkBorder
            cursor-pointer
            transition
            hover:scale-110
        `,
        participateWithdrawn: `
            border-accentColor
            dark:border-accentColor
        `,
        participateLose: `
            border-red-600
            dark:border-red-600
        `,
        participateWin: `
            border-lime-400
            dark:border-lime-400
        `,
        detailsIcon: `
            w-[50%] h-[50%]
            fill-lightBorder dark:fill-darkBorder
        `,
    }
    
    return (
        <div className={archivedJackpotStyles.ctn + 
            (props.participationStatus === "withdrawn"
            ? archivedJackpotStyles.participateWithdrawn
            : (props.participationStatus === "win"
            ? archivedJackpotStyles.participateWin
            : (props.participationStatus === "lose"
            ? archivedJackpotStyles.participateLose
            : "")))}>
            <span className={archivedJackpotStyles.jackpotGameTextTitle}>Round id:
                <span className={archivedJackpotStyles.jackpotGameTextValue}>{props.roundId}</span>
            </span>
            <span className={archivedJackpotStyles.jackpotGameTextTitle}>Prize pool:
                <span className={archivedJackpotStyles.jackpotGameTextValue + archivedJackpotStyles.textAccentOrange}>{props.prizePool}</span>
            </span>
            <span className={archivedJackpotStyles.jackpotGameLastRow}>
                <span className={archivedJackpotStyles.jackpotGameTextTitle}>Ended on:<span className={archivedJackpotStyles.jackpotGameTextValue + archivedJackpotStyles.textAccentBlue}>{props.endTime}</span></span>
                <div className={archivedJackpotStyles.jackpotDetailsBtn} onClick={() => props.onClickDetailsBtn!(props.roundId)}>
                    <SvgIcon
                    style={archivedJackpotStyles.detailsIcon}
                    viewBox="0 0 122.88 29.956"
                    pathD="M122.88,14.978c0,8.271-6.708,14.979-14.979,14.979s-14.976-6.708-14.976-14.979 C92.926,6.708,99.631,0,107.901,0S122.88,6.708,122.88,14.978L122.88,14.978z M29.954,14.978c0,8.271-6.708,14.979-14.979,14.979 S0,23.248,0,14.978C0,6.708,6.705,0,14.976,0S29.954,6.708,29.954,14.978L29.954,14.978z M76.417,14.978 c0,8.271-6.708,14.979-14.979,14.979c-8.27,0-14.978-6.708-14.978-14.979C46.46,6.708,53.168,0,61.438,0 C69.709,0,76.417,6.708,76.417,14.978L76.417,14.978z"
                    />

                </div>
            </span>
        </div>   
    )

}

export default ArchivedJackpotRound