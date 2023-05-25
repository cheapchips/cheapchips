import ModalProps from "./ModalSkeletonProps"

export default interface JackpotArchiveInfoModalProps extends ModalProps {
    endTime: number // Unix seconds
    playerCount: number
    poolPrize: number
    prizeWithdrawn: boolean
    winnerId: number
    roundId: number
}