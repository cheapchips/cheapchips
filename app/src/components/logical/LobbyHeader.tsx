import LobbyHeaderProps from "../../proptypes/LobbyHeaderProps"

const LobbyHeader = (props:LobbyHeaderProps) => {

    const lobbyHeaderStyles = {
        ctn: `
            flex flex-col gap-2
            md:text-xxxs
            lg:text-xxs
            xl:text-sm
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
            bg-lightBgActive
            dark:bg-darkBgActive
            rounded-md
            border
            ${props.active ? "border-lightBorder dark:border-darkBorder" : "border-lightBgActive dark:border-darkBgActive"}
        `,
        playerInfoBar:`
            h-2.5 rounded-md
            ${props.active ? "bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-orange-500 to-yellow-300" : ""}
            shadow-sm
        `,
        lineCtn: `
            flex
            px-1
        `,
        textTitle:`
            flex justify-start
            font-semibold
            lightText
            dark:text-darkText
            p-1
        `,
        textTitleInactive: `
            rounded-md
            w-1/2 h-7
            p-1
        `,
        textLobbyId:`
            font-normal
            p-1
        `,
        text: `
            font-normal
            text-lightText
            dark:text-darkText
        `,
        textInactive: `
            rounded-md
            w-1/3 h-6
        `,
        inactiveBg: `
            bg-lightBgActive
            dark:bg-darkBgActive
        `,
    }

    return (

        <div className={lobbyHeaderStyles.ctn}>

            
            <div className={lobbyHeaderStyles.titleCtn}>
            
                {props.active
                    ?
                        <span className={lobbyHeaderStyles.textTitle}>
                            {props.title}
                        </span>
                    :
                        <span className={lobbyHeaderStyles.textTitleInactive + lobbyHeaderStyles.inactiveBg}></span>
                }
                
                {props.active
                    ?
                        <span className={lobbyHeaderStyles.textLobbyId}>
                            id: {props.lobbyId}
                        </span>
                    :
                        <span className={lobbyHeaderStyles.textTitleInactive + lobbyHeaderStyles.inactiveBg}></span>
                }
            
            </div>

            <div className={lobbyHeaderStyles.playerInfoCtn}>
                
                {props.active
                    ?
                        <span className={lobbyHeaderStyles.lineCtn + lobbyHeaderStyles.text}>Players: {props.playerCount} / {props.maxPlayerCount}</span>
                    :
                        <span className={lobbyHeaderStyles.lineCtn + lobbyHeaderStyles.textInactive + lobbyHeaderStyles.inactiveBg}></span>
                }
                
                <div className={lobbyHeaderStyles.playerInfoBarCtn}>
                    <div className={lobbyHeaderStyles.playerInfoBarBorder}>
                        <div style={{width: `${props.playerCount}%`}} className={lobbyHeaderStyles.playerInfoBar}></div>
                    </div>
                </div>
                
            </div>
        
        </div>
       
    )
}

export default LobbyHeader