import ParticipationStatus from "./ParticipationStatus"

type ArchivedJackpot = {
    participationStatus: ParticipationStatus
    prizePool: number
    endTime: string
    roundId: number
}

export default ArchivedJackpot