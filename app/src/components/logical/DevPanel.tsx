import { useContext } from "react"
import JackpotContext from "../../contexts/JackpotContext"

export default function DevPanel(){

    const jackpotContext = useContext(JackpotContext)

    if(jackpotContext) return(
        <div id="test" className='absolute text-sm top-4 left-[23%] flex gap-4 underline border' > 
                    
        <button onClick={() => {
            const rand_addr = Math.random().toString(36).substring(2,9)
            const rand_ticket = Math.floor(Math.random() * (5 - 1 + 1) + 1)
            if(!jackpotContext.players) return
            const newPlayer = {
                address: rand_addr,
                ticketAmount: rand_ticket,
                id: jackpotContext.players.length,
            }
            if(jackpotContext.players.length >= 3) return
            jackpotContext.addPlayer(newPlayer)
        }}>  
            <span className="font-content">Add player</span>
        </button>
        
        <button onClick={() => {
            jackpotContext.setRoundState("closed")
        }}>
            <span className="font-content">Start jackpot</span>
        </button>
        
        <button onClick={() => {
            if(!jackpotContext.winnerId) return
            jackpotContext.winnerId.current = 0
            jackpotContext.setRoundState("ended")
        }}>End jackpot</button>
        

        </div>

    )
    return <></>
}