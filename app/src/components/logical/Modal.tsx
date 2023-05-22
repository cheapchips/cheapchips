import ModalProps from "../../proptypes/ModalProps"

const Modal = (props:ModalProps) => {
 
    const modalStyles = {
        fullscreenBg: `
            flex justify-center items-center
            w-screen h-screen
            bg-transparent
            absolute
            backdrop-blur-2xl
            drop-shadow-2xl
            z-10
        `,
        ctn: `
            absolute
            flex flex-col flex-cols-[min,max]
            justify-start items-center
            self-center place-self-center z-50
            bg-lightBg
            dark:bg-darkBg
            border
            border-lightBorder
            dark:border-darkBorder
            rounded-md
            z-50
            ${props.size === "Big" ? `
                w-2/3 h-3/4
            `
            : props.size === "Medium" ? `
                w-1/2 h-2/3
            `
            : props.size === "Small" ? `
                w-1/3 h-1/4
            `
            : ""
            }
        `,
        titleCtn: `
            flex justify-between items-center w-full
            ${props.size === "Big" ? "h-10" : props.size === "Medium" ? "h-8" : props.size === "Small" ? "h-6" : ""}
            bg-black
            p-2
        `,
        closeBtn: `
            ${props.size === "Big" ? `
                w-8 h-8
            `
            : props.size === "Medium" ? `
                w-7 h-7
            `
            : props.size === "Small" ? `
                w-6 h-6
            `
            : ""}
            bg-red-500
            cursor-pointer
            rounded-md
        `,

    }


    return (
        <div className={modalStyles.fullscreenBg}>
            <div id="modal" className={modalStyles.ctn}>
                <div className={modalStyles.titleCtn}>
                    <span className="">{props.title}</span>
                    <div onClick={() => props.onClickClose()} className={modalStyles.closeBtn}></div>
                </div>
                {props.children}
            </div>
        </div>
    )


}


export default Modal