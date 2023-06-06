import ModalSkeleton from "../ModalSkeleton";
import { useState, useEffect } from "react"
import useJackpot from "../../../hooks/useJackpot";
import TransactionModal from "./TransactionModal";

const styles = {
    ctn: `
        flex justify-center items-center font-content grow
    `,

    roundDataCtn: `
        flex flex-col gap-2 text-center w-1/2 p-2
    `,

    roundDataValue: `
        font-semibold ml-1
    `,

    win: `
        text-emerald-400
    `,
    lose: `
        text-red-600
    `,
    withdrawn: `
        text-accentColor
    `,
    none: ``,
    
    withdrawBtn: `
        w-2/3 self-center
        px-4 py-2 my-2
        border border-lightBorder dark:border-darkBorder
        rounded-md
        hover:opacity-80
        active:opacity-60
        participate_withdrawn_glow
        text-accentColor
        font-semibold
        animate-pulse
    `,
}

type RoundState = "default" | "closed" | "ended"
type ParticipationStatus = "none" | "win" | "lose" | "withdrawn"

interface FullRoundData {
    roundId: number
    numberOfPlayers: number
    userId: number
    userParticipationStatus: ParticipationStatus
    prizePool: number
    status: RoundState
    endTime: Date
    winnerId: number
}

const RoundData = (props:{roundData:FullRoundData, onClickWithdraw: () => void}) => {

    const roundStates = ["default", "closed", "ended"]
    const {roundId, prizePool, numberOfPlayers, userId, winnerId, userParticipationStatus, status, endTime} = props.roundData
    
    return (
        <div className={styles.roundDataCtn}>
            <span>Round id:
                <span className={styles.roundDataValue}>{roundId}</span>
            </span>
            <span>Prize pool:
                <span className={styles.roundDataValue}>{prizePool}</span>
            </span>
            <span>Number of players:
                <span className={styles.roundDataValue}>{numberOfPlayers}</span>
            </span>
            <span>Your id in round:
                <span className={styles.roundDataValue}>{userId}</span>
            </span>
            <span>Round winner id:
                <span className={styles.roundDataValue}>{winnerId}</span>
            </span>
            <span>Participation status:
                <span className={styles.roundDataValue + styles[userParticipationStatus]}>{userParticipationStatus}</span>
            </span>
            <span>Round status:
                <span className={styles.roundDataValue}>{roundStates[+status]}</span>
            </span>
            <span>
                endTime:<span className={styles.roundDataValue}>{endTime.toLocaleDateString('en-US')}</span>
            </span>
        
            {userParticipationStatus === "win"
            ?
                <button onClick={() => props.onClickWithdraw()} className={styles.withdrawBtn}>WITHDRAW {prizePool} CHIPS</button>   
            :
                <></>
            }
        </div>
    )
}

const ArchivedRoundModal = (props:{roundId:number, onClickClose:() => void, onClickWithdraw: () => void}) => {
    
    const title = `Details of round ${props.roundId}`
    const [writeJackpot,readJackpot] = useJackpot()
    const [ready, setReady] = useState<boolean>(false)
    const [txModalVisible, setTxModalVisible] = useState<boolean>(false)
    const [fullRoundData, setFullRoundData] = useState<FullRoundData>()
    
    useEffect(() => {
        if(ready) return
        fetchRoundData()
    }, [])

    useEffect(() => {
      if(!fullRoundData) return
      setReady(true)
    }, [fullRoundData])


    async function fetchRoundData() {

        const {numberOfPlayers, tickets, status, endTime, winnerId} = await readJackpot.getRoundData(props.roundId)
        const userId = await readJackpot.getPlayerIdInRound(props.roundId)
        const userParticipationStatus = await readJackpot.getParticipationStatus(props.roundId)

        const fullData:FullRoundData = {
            roundId: props.roundId,
            numberOfPlayers: numberOfPlayers,
            userId,
            userParticipationStatus,
            prizePool: tickets.length,
            status: status,
            endTime: endTime,
            winnerId: winnerId,
        }

        setFullRoundData(fullData)
    }

    function withdrawChips() {
        try {
            writeJackpot.withdrawPrize(props.roundId)
            setTxModalVisible(true)
        } catch (error) {
            console.warn(error)
        }
    }

    return (
        <>
        <ModalSkeleton title={title} size="Medium" onClickClose={() => props.onClickClose()}>
            <div className={styles.ctn}>
            {
                ready && fullRoundData
                ?
                <RoundData roundData={fullRoundData} onClickWithdraw={() => withdrawChips()}/>
                :
                <span>(...)</span>
            }
            </div>
        </ModalSkeleton>
        {
            txModalVisible ?
            <TransactionModal txTitle="Chips withdrawal" onClickClose={() => {setTxModalVisible(false)}}/>
            :
            <></>
        }
        </>
    )
}

export default ArchivedRoundModal