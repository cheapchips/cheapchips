import Blockies from 'react-blockies'
import CheapChipsLogo from "../../../../assets/logo.png"

type Player = {
  readonly address: string
  readonly ticketAmount: number
  readonly id: number
}

const LobbyElement = (props: {player: Player, maxTicketsPerPlayer: number }) => {
  
    const styles = {
        ctn: `
            flex
            2xl:w-full
            xl:w-max
            lg:w-max
            md:w-max
            p-2
            odd:bg-lightBgActive dark:odd:bg-darkBgActive
            border-b border-lightBorder dark:border-darkBorder
            text-lightText
            dark:text-darkText
            md:text-xxxs
            lg:text-xxs
            xl:text-sm
            font-content
        `,
        blockiesCtn: `
            flex justify-center items-center content-center
            2xl:w-auto 2xl:h-auto
            xl:w-10 xl:h-10 xl:self-center
            lg:w-8 lg:h-8 lg:self-center
            md:w-6 md:h-6 md:self-center
            sm:w-6 sm:h-6 sm:self-center
            rounded-full
            bg-lightBgActive dark:bg-darkBgActive
            border border-lightBorder dark:border-darkBorder
            aspect-square
            overflow-hidden
        `,
        blockies: `
            rounded-full
            p-2
        `,
        infoCtn: `
            flex flex-col
            ml-2
            select-none
        `,
        rowCtn: `
            flex h-1/2
        `,
        chipToken: `
            xl:w-7 xl:h-7
            lg:w-5 lg:h-5
            md:w-4 md:h-4
            -rotate-12
            mr-2
        `,
        inactiveChipToken: `
            opacity-[23%]
            contrast-20
            select-none
        `,
    }
  
    const percentages = [20,40,60,80,100]
    const tickets = []

    for (let i = 0; i < 5; i++) {
    tickets.push(
        <img className={
            ((props.player.ticketAmount * 20) >= percentages[i]) ? styles.chipToken : (styles.chipToken + styles.inactiveChipToken)
        } draggable={false} src={CheapChipsLogo} alt='ChipToken' key={i}
    />)
    }

  return (
    <div className={styles.ctn}>
        <div className={styles.blockiesCtn}>
            <Blockies className={styles.blockies} seed={props.player.address} size={16} />
        </div>
      <div className={styles.infoCtn}>
        <div className={styles.rowCtn}>id: {props.player.id} tickets: {props.player.ticketAmount}</div>
        <div className={styles.rowCtn}>{tickets}</div>
      </div>
    </div>
  )
}

export default LobbyElement