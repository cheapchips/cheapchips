import LobbyHeaderProps from "../../proptypes/LobbyHeaderProps"

const LobbyHeader = (props:LobbyHeaderProps) => {

    const lobbyHeaderStyles = {
        ctn: `
        flex flex-col gap-1
        w-full h-fit
        rounded-t-md
        border-b
        dark:border-slate-700
        `,
        titleCtn: `
        grid grid-cols-2
        w-full h-12
        p-2
        border-b
        dark:border-slate-700
        `,
        playerInfoCtn: `
        grid grid-rows-2
        w-full h-20 p-2
        `,
        playerInfoBarCtn: `
        w-full p-2
        `,
        playerInfoBar:`
        w-full h-full bg-amber-200 rounded-md
        `,
        lineCtn: `
        flex justify-start align-middle content-center
        px-2
        `,
        textTitle:`
        flex justify-start
        text-sm
        font-bold
        dark:text-white
        p-2
        `,
        textLobbyId:`
        font-normal
        `,
        text: `
        text-sm
        dark:text-white
        `,
    }

    return (
        <div className={lobbyHeaderStyles.ctn}>
            
            <div className={lobbyHeaderStyles.titleCtn}>
                <span className={lobbyHeaderStyles.textTitle}>{props.title}</span>
                <span className={lobbyHeaderStyles.textTitle + lobbyHeaderStyles.textLobbyId}>id: {props.lobbyId}</span>
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