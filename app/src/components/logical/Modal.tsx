import ModalSkeletonProps from "../../proptypes/ModalSkeletonProps"
import SvgIcon from "../layout/SvgIcon"

const ModalSkeleton = (props:ModalSkeletonProps) => {

    const modalStyles = {
        fullscreenBg: `
            flex justify-center items-center
            w-screen h-screen
            absolute
            backdrop-blur-2xl
            drop-shadow-2xl
            z-10
            text-xl
            font-content
            select-none
            ${props.customBg ? props.customBg : ""}
        `,
        ctn: `
            absolute
            flex flex-col
            justify-start
            self-center place-self-center z-50
            bg-lightBg
            dark:bg-darkBg
            border
            border-lightBorder
            dark:border-darkBorder
            rounded-md
            z-50
            ${props.size === "Big" ? `
                w-3/5 h-[90%]
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
            ${props.size === "Big" ? "h-12" : props.size === "Medium" ? "h-9" : props.size === "Small" ? "h-8" : ""}
            py-2 px-4
            rounded-t-md
            border-b
            border-lightBorder
            dark:border-darkBorder
        `,
        closeBtn: `
            flex justify-center items-center
            hover:opacity-80
            active:opacity-40
            ${props.size === "Big" ? `
                w-7 h-7
            `
            : props.size === "Medium" ? `
                w-6 h-6
            `
            : props.size === "Small" ? `
                w-5 h-5
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
                    <span>{props.title}</span>
                    <div onClick={() => props.onClickClose()} className={modalStyles.closeBtn}>
                        <SvgIcon style="w-1/2 h-1/2 fill-red-800 stroke" viewBox="0 0 121.31 122.876" pathD="M90.914,5.296c6.927-7.034,18.188-7.065,25.154-0.068 c6.961,6.995,6.991,18.369,0.068,25.397L85.743,61.452l30.425,30.855c6.866,6.978,6.773,18.28-0.208,25.247 c-6.983,6.964-18.21,6.946-25.074-0.031L60.669,86.881L30.395,117.58c-6.927,7.034-18.188,7.065-25.154,0.068 c-6.961-6.995-6.992-18.369-0.068-25.397l30.393-30.827L5.142,30.568c-6.867-6.978-6.773-18.28,0.208-25.247 c6.983-6.963,18.21-6.946,25.074,0.031l30.217,30.643L90.914,5.296L90.914,5.296z" />
                    </div>
                </div>
                {props.children}
            </div>
        </div>
    )


}


export default ModalSkeleton