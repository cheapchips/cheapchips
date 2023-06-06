import ModalSkeleton from "../ModalSkeleton";




const MyDetailsModal = (props:{onClickClose: () => void}) => {




    return (
        <ModalSkeleton title="My details" size="Small" onClickClose={() => props.onClickClose()}>
            <div className="flex grow justify-center items-center font-content">
                <span>Profile stats coming soon...</span>
            </div>
        </ModalSkeleton>
    )
}



export default MyDetailsModal