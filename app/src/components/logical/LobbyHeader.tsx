import LobbyHeaderProps from "../../proptypes/LobbyHeaderProps"

const LobbyHeader = (props:LobbyHeaderProps) => {

    const lobbyHeaderStyles = {
        ctn: `
            flex flex-col gap-1
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
        playerInfoBar:`
            w-${playerInfoBar()}
            h-2.5 rounded-md
            bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-orange-500 to-yellow-300
            shadow-sm
        `,
        lineCtn: `
            flex
            p-1
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

    function playerInfoBar():string {
        if(props.playerCount < 10) return "2"
        const perc = (Math.floor(props.playerCount / 10) * 10).toString() + "p"
        return perc
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
                    <div className={lobbyHeaderStyles.playerInfoBar}></div>
                </div>
            </div>
        
        </div>
    )
}

export default LobbyHeader