import JackpotArchiveInfoModalProps from "../../../proptypes/JackpotArchiveInfoModalProps"
import ModalSkeleton from "../Modal"



const JackpotArchiveInfoModal = (props:JackpotArchiveInfoModalProps) => {


    const modalStyles = {
        ctn: ``,

    }


    return (
        <ModalSkeleton title={props.title} size={props.size} onClickClose={props.onClickClose}>



        </ModalSkeleton>
    )

}