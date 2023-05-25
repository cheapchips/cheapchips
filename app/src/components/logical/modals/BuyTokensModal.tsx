import { useState, useEffect } from "react"
import ModalSkeletonProps from "../../../proptypes/ModalSkeletonProps"
import ModalSkeleton from "../Modal"

const BuyTokensModal = (
    props: {
        title: string,
        size: "Big" | "Medium" | "Small",
        onClickClose: () => void,
    }
) => {

    const buyTokensStyles = {
    }

    return (
        <ModalSkeleton
            {...props}
            // title={props.title}
            // size={props.size}
            // onClickClose={props.onClickClose}
        >
            <div className="grow flex justify-center items-center">


                Buy tokensss

            </div>


        </ModalSkeleton>
    )

}

export default BuyTokensModal