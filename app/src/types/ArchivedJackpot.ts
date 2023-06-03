import ParticipationStatus from "./ParticipationStatus"

type ArchivedJackpot = {
    participationStatus: ParticipationStatus
    prizePool: number
    endTime: string
    roundId: number
    onClickDetailsBtn?: (roundId:number) => void
}

export default ArchivedJackpot