import { useState, useEffect } from "react"
import Modal from "./Modal"

const TutorialModal = (
    props: {
        title: string,
        size: "Big" | "Medium" | "Small",
        onClickClose: () => void,
    }
) => {

    const [page, setPage] = useState<number>(0)

    const tutorialStyles = {

    }


    return (
        <Modal title={props.title} size={props.size} onClickClose={props.onClickClose} >

        </Modal>            

    )


}



