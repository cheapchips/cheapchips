import ModalProps from "../../proptypes/ModalProps"


const Modal = (props:ModalProps) => {
 
    const modalStyles = {
        ctn: `
            absolute
            flex justify-center items-center
            self-center place-self-center z-50
            bg-lightBg
            dark:bg-darkBg
            border
            border-lightBorder
            dark:border-darkBorder
            ${props.size === "Big" ? `
                w-2/3 h-2/3
            `
            : props.size === "Medium" ? `
            
            `
            : props.size === "Small" ? `
            
            `
            : ""
            }
            rounded-md

        `,
        closeBtn: `
            absolute top-0 right-0 m-2
            w-10 h-10
            bg-red-500
            cursor-pointer
        `,

    }


    return (
        <div id="modal" className={modalStyles.ctn}>
            <div onClick={() => props.onClickClose()} className={modalStyles.closeBtn}></div>
            {props.children}
        </div>
    )


}


export default Modal