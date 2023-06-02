import Blockies from 'react-blockies'

type Player = {
  readonly address: string
  readonly ticketAmount: number
  readonly id: number
}

type PlayerListProps = {
  players: Player[]
  playerIconSize: number
  displayExtraInfo: boolean
}

const PlayerList = (props: PlayerListProps) => {
  return (
    <>
      {props.players.map((player, index) => (
        <div key={index}>
          {props.displayExtraInfo ? (
            <>
              <Blockies seed={player.address} size={props.playerIconSize} />
              Id: {player.id} Stake: {player.ticketAmount}
            </>
          ) : (
            <Blockies seed={player.address} size={props.playerIconSize} />
          )}
        </div>
      ))}
    </>
  )
}

export default PlayerList
