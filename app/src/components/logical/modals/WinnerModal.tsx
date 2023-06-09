import ModalSkeleton from "../ModalSkeleton";
import { Player } from "../../../types/Player";


const WinnerModal = (props:{winner:Player | undefined, onClickClose:() => void}) => {

    const styles = {}


    return (
        <ModalSkeleton title="Tutorial" size={'Big'} onClickClose={props.onClickClose}>



        </ModalSkeleton>
    )

}

export default WinnerModal