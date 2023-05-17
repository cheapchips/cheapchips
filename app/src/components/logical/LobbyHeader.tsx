import LobbyHeaderProps from "../../proptypes/LobbyHeaderProps"

const LobbyHeader = (props:LobbyHeaderProps) => {

    const lobbyHeaderStyles = {
        ctn: `
            flex flex-col gap-2
            border-b
            border-lightBorder
            dark:border-darkBorder
        `,
        titleCtn: `
            w-full grid grid-cols-2
            p-2
            border-b
            border-lightBorder
            dark:border-darkBorder
        `,
        playerInfoCtn: `
            grid grid-rows-2 grid-rows-[1fr,0.5fr]
            px-2
        `,
        playerInfoBarCtn: `
            w-full h-fit py-2
            px-1
        `,
        playerInfoBarBorder: `
            rounded-md
            border
            border-lightBorder dark:border-darkBorder
        `,
        // This part is insanely ugly, but for now this is the only way.
        playerInfoBar:`
            ${props.playerCount > 90
                ? 'w-[95%]'
                : props.playerCount > 80
                ? 'w-[85%]'
                : props.playerCount > 70
                ? 'w-[75%]'
                : props.playerCount > 60
                ? 'w-[65%]'
                : props.playerCount > 50
                ? 'w-[55%]'
                : props.playerCount > 40
                ? 'w-[45%]'
                : props.playerCount > 30
                ? 'w-[35%]'
                : props.playerCount > 20
                ? 'w-[25%]'
                : props.playerCount > 10
                ? 'w-[15%]'
                : props.playerCount > 5
                ? 'w-[10%]'
                : props.playerCount > 4
                ? 'w-[5%]'
                : props.playerCount > 3
                ? 'w-[4%]'
                : props.playerCount > 2
                ? 'w-[3%]'
                : props.playerCount > 1
                ? 'w-[2%]'
                : props.playerCount > 0
                ? 'w-[1%]'
                : "w-0"
            }
            h-2.5 rounded-md
            bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-orange-500 to-yellow-300
            shadow-sm
            `,
        lineCtn: `
            flex
            px-1
        `,
        textTitle:`
            flex justify-start
            text-sm font-semibold
            lightText
            dark:text-darkText
            p-1
        `,
        textLobbyId:`
            text-sm font-normal
            p-1
        `,
        text: `
            text-sm font-normal
            text-lightText
            dark:text-darkText
        `,
    }

    return (
        <div className={lobbyHeaderStyles.ctn}>
            
            <div className={lobbyHeaderStyles.titleCtn}>
                <span className={lobbyHeaderStyles.textTitle}>{props.title}</span>
                <span className={lobbyHeaderStyles.textLobbyId}>id: {props.lobbyId}</span>
            </div>

            <div className={lobbyHeaderStyles.playerInfoCtn}>
                <span className={lobbyHeaderStyles.lineCtn + lobbyHeaderStyles.text}>Players: {props.playerCount} / {props.maxPlayerCount}</span>
                <div className={lobbyHeaderStyles.playerInfoBarCtn}>
                    <div className={lobbyHeaderStyles.playerInfoBarBorder}>
                        <div className={lobbyHeaderStyles.playerInfoBar}></div>
                    </div>
                </div>
            </div>
        
        </div>
    )
}

export default LobbyHeader