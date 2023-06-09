import ParticipationStatus from "./ParticipationStatus"

type ArchivedJackpot = {
    participationStatus: ParticipationStatus
    participantId: number,
    prizePool: number
    endTime: string
    roundId: number
}

export default ArchivedJackpot