import Blockies from 'react-blockies'

type Player = {
  readonly address: string
  readonly ticketAmount: number
  readonly id: number
}

const PlayerList = (props:{players: Player[], playerIconSize: number}) => {

    const styles = {
        playerIcon: `
            rounded-md border-2 border-lightBorder dark:border-darkBorder p-px
        `,
    }

  return (
    <>
      {props.players.map((player, index) => (
        <div key={index}>
            <Blockies seed={player.address} size={props.playerIconSize} className={styles.playerIcon} />
        </div>
      ))}
    </>
  )
}

export default PlayerList