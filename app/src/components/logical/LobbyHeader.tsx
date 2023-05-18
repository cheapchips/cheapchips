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
            borderor
            border-lightBorder
            dark:border-darkBorder
        `,
        // This part is insanely ugly, but for now this is the only way.
        playerInfoBar:`
            ${
                props.active === false ? "w-0"
                :
                props.playerCount > 90
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
                        <div className={lobbyHeaderStyles.playerInfoBar}></div>
                    </div>
                </div>
                
            </div>
        
        </div>
       
    )
}

export default LobbyHeader