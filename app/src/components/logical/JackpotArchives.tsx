import SvgIcon from "../layout/SvgIcon"
import useJackpot from "../../hooks/useJackpot"
import ArchivedJackpotRound from "./ArchivedJackpotRound"
import Web3Context from "../../contexts/Web3Context"
import JackpotContext from "../../contexts/JackpotContext"
import ArchivedJackpot from "../../types/ArchivedJackpot"
import ParticipationStatus from "../../types/ParticipationStatus"
import { useEffect, useContext, useState } from "react"
import { useAutoAnimate } from '@formkit/auto-animate/react'
import { ChipsJackpotCoreInterface } from "../../../../contracts/typechain-types"

    const styles = {
        mainCtn: `
            flex flex-col
            overflow-y-auto
        `,
        archivesMainCtn: `
            overflow-y-auto
        `,
        archivesCtn: `
            flex flex-col p-2 gap-2
        `,
        archivesListCtn: `
            flex flex-col-reverse gap-2
            font-content
        `,
        titleCtn: `
            flex h-fit items-center font-content
            fill-lightText dark:fill-darkText
            xl:p-2 lg:p-1
            border-b border-lightBorder dark:border-darkBorder
        `,
        titleText: `
            p-1
            font-semibold
            select-none
        `,
        titleTextInactive: `
            w-1/3
            xl:h-7 lg:h-4 md:h-3
            bg-lightBgActive
            dark:bg-darkBgActive
            rounded-md
            animate-pulse
        `,
        inactiveArchive: `
            bg-lightBgActive
            dark:bg-darkBgActive
            2xl:h-20 xl:h-14 lg:h-10 md:h-10
            2xl:p-2 xl:p-1 md:p-1
            rounded-md
            2xl:text-sm xl:text-xs lg:text-xxxs md:text-xxxxxs
            animate-pulse
        `,
        
    }


const ArchivedRoundList = ({archivedRounds}:{archivedRounds:ArchivedJackpot[]}) => {
    const [archivesRef] = useAutoAnimate()
    const archivesList = archivedRounds.slice(0).reverse().map((roundData, index) => (
        <ArchivedJackpotRound
            participationStatus={roundData.participationStatus}
            participantId={roundData.participantId}
            prizePool={roundData.prizePool}
            endTime={roundData.endTime}
            roundId={roundData.roundId}
            key={index}
        />
    ))
    return <div className={styles.archivesListCtn} ref={archivesRef}>{archivesList}</div>
}

const JackpotArchives = () => {

        const web3 = useContext(Web3Context)
        const jackpotContext = useContext(JackpotContext)
        const [active, setActive] = useState<boolean>(false)
        const [,readJackpot] = useJackpot()
        const [archivedRounds, setArchivedRounds] = useState<ArchivedJackpot[]>([])
        const [isArchivesFetched, setIsArchivesFetched] = useState<boolean>(false)
        const [previousRoundId, setPreviousRoundId] = useState<number>()

        useEffect(() => {
            if(!web3.address || !jackpotContext.roundId || !jackpotContext.endTime || isArchivesFetched) return
            fetchArchivedRounds()
            setActive(true)
            setIsArchivesFetched(true)
            setPreviousRoundId(jackpotContext.roundId)
        },[jackpotContext])

        useEffect(() => {
            if(!isArchivesFetched) return
            // console.log('updating archives')
            setArchivedRounds([])
            fetchArchivedRounds()
        }, [web3.chipStableBalance]) 

        // debug
        // useEffect(() => {
        //     (async () => {
        //         const round = await getArchivedRoundData(0)
        //         const participantId = await readJackpot.getPlayerIdInRound(previousRoundId)
        //         const newRoundToArchive:ArchivedJackpot = {
        //             prizePool: round.roundData.tickets.length as number,
        //             participationStatus: round.participantStatus as ParticipationStatus,
        //             participantId: participantId as number,
        //             endTime: round.roundData.endTime.toLocaleDateString('en-US'),
        //             roundId: round.roundData.id as number,
        //         }
        //         setArchivedRounds(prev => [newRoundToArchive, ...prev])
        //     })()
        // }, [jackpotContext.roundId])
        
        useEffect(() => {
            (async() => {
                // console.log(previousRoundId, jackpotContext.roundId)
                if(previousRoundId === jackpotContext.roundId || !previousRoundId) return
                const round = await getArchivedRoundData(+previousRoundId)
                const participantId = await readJackpot.getPlayerIdInRound(previousRoundId)
                const newRoundToArchive:ArchivedJackpot = {
                    prizePool: round.roundData.tickets.length as number,
                    participationStatus: round.participantStatus as ParticipationStatus,
                    participantId: participantId as number,
                    endTime: round.roundData.endTime.toLocaleDateString('en-US'),
                    roundId: round.roundData.id as number,
                }
                setArchivedRounds(prev => [newRoundToArchive, ...prev])
                setPreviousRoundId(roundId => roundId! + 1)
            })()
        }, [jackpotContext.roundId])

        async function getArchivedRoundData(id:number){
            const roundData = await readJackpot.getRoundData(id)
            const participantStatus = await readJackpot.getParticipationStatus(id)
            const participantId = await readJackpot.getPlayerIdInRound(id)
            return {roundData, participantStatus, participantId}
        }
        
        async function fetchArchivedRounds () {

            const rounds = await readJackpot.getRoundDataRange(0, jackpotContext.roundId! - 1) as ChipsJackpotCoreInterface.ArchivedRoundStructOutput[]
            // debug
            // const rounds = await readJackpot.getRoundDataRange(0, 2) as ChipsJackpotCoreInterface.ArchivedRoundStructOutput[]

            const participationStatus:ParticipationStatus[] = ["none", "win", "lose", "withdrawn"]

            const archivedRounds = rounds.slice(0).reverse().map<ArchivedJackpot>((round) => ({
                prizePool: round.prizePool.toNumber(),
                participationStatus: participationStatus[round.playerParticipationStatus],
                participantId: round.playerId,
                endTime: new Date(round.endTime.toNumber() * 1000).toLocaleDateString("en-US"),
                roundId: round.id.toNumber()
            }))
            setArchivedRounds(archivedRounds)
        }

        const InactiveArchivedRoundList = () => {
            const inactiveOpacities = [100, 80, 60, 40, 20]
            const inactiveArchives = inactiveOpacities.map((opacity, index) => (
                <div className={styles.inactiveArchive} style={{opacity: `${opacity}%`}} key={index}></div>
            ))
            return <>{inactiveArchives}</>
        }

    return (
        <div className={styles.mainCtn}>
            <div className={styles.titleCtn}>
                {active
                    ?
                        <>
                            <SvgIcon style="w-5 h-5" viewBox="0 0 122.88 108.12" pathD="M28.45,55.88c0,.11,0,.22,0,.32l4.44-4.46a6.68,6.68,0,1,1,9.48,9.42L27.14,76.51a6.69,6.69,0,0,1-9.32.15L2.28,63A6.68,6.68,0,0,1,11.08,53l4,3.54v0a54.33,54.33,0,0,1,8-31,52.56,52.56,0,0,1,24-20.73,60.17,60.17,0,0,1,11-3.51,52.58,52.58,0,0,1,60.1,31.09,58.07,58.07,0,0,1,3.47,11,52.47,52.47,0,0,1-1.31,26.95A53.16,53.16,0,0,1,105.8,93a57.11,57.11,0,0,1-22.56,13.1,48.52,48.52,0,0,1-40.51-5.89A6.68,6.68,0,0,1,50,89a35.12,35.12,0,0,0,5.53,3,34.21,34.21,0,0,0,5.7,1.86,35.43,35.43,0,0,0,18.23-.54A43.77,43.77,0,0,0,96.74,83.19a39.7,39.7,0,0,0,10.93-17.06,39,39,0,0,0,1-20.08,46.38,46.38,0,0,0-2.68-8.5,39.19,39.19,0,0,0-45-23.22,45,45,0,0,0-8.52,2.72A39,39,0,0,0,34.5,32.49a40.94,40.94,0,0,0-6.05,23.39ZM60.83,34a6.11,6.11,0,0,1,12.22,0V53l14.89,8.27A6.09,6.09,0,1,1,82,71.93L64.43,62.16a6.11,6.11,0,0,1-3.6-5.57V34Z" />
                            <span className={styles.titleText}>Game history</span>
                        </>
                    :
                    <span className={styles.titleTextInactive}></span>
                }
        </div>
        
            <div className={styles.archivesMainCtn}>
                <div className={styles.archivesCtn}>
                    {active
                    ?
                    <ArchivedRoundList archivedRounds={archivedRounds}/> 
                    :
                    <InactiveArchivedRoundList />
                }
                </div>
            </div>
        </div>
    )
}

export default JackpotArchives