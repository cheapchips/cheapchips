import useTrasaction from "../../../hooks/useTransaction";
import { useState } from "react"
import ModalSkeleton from "../Modal";
import ModalSkeletonProps from "../../../proptypes/ModalSkeletonProps";

const TransactionModal = (props:ModalSkeletonProps) => {

    const status = useTrasaction()

    return (


        <ModalSkeleton {...props}>



        </ModalSkeleton>

    )
}

export default TransactionModal