import JackpotArchiveInfoModalProps from "../../proptypes/JackpotArchiveInfoModalProps"
import Modal from "./Modal"



const JackpotArchiveInfoModal = (props:JackpotArchiveInfoModalProps) => {


    const modalStyles = {
        ctn: ``,

    }


    return (
        <Modal title={props.title} size={props.size} onClickClose={props.onClickClose}>



        </Modal>
    )

}