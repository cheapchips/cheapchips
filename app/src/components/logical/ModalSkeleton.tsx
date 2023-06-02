import ModalSkeletonProps from "../../proptypes/ModalSkeletonProps"
import SvgIcon from "../layout/SvgIcon"
import { useEffect, useState } from "react"

const ModalSkeleton = (props:ModalSkeletonProps) => {

    const [spawned, setSpawned] = useState<boolean>(false)

    // useEffect(() => {
    //     console.log('modal mount')
    //     setSpawned(true)
    // }, [props.onSpawn])

    const modalStyles = {
        fullscreenBg: `
            flex justify-center items-center
            w-screen h-screen absolute
            backdrop-blur-2xl drop-shadow-2xl
            z-10
            font-content select-none
            xl:text-sm lg:text-xxs md:text-xxxs sm:text-xxxxs
            ${props.customBg ? props.customBg : ""}
            ${!props.fadeAnimationDisabled && spawned ? "fadein_anim" : ""}
        `,
        ctn: `
            absolute
            flex flex-col
            justify-start
            self-center place-self-center z-50
            bg-lightBg/30
            dark:bg-darkBg/30
            border
            border-lightBorder
            dark:border-darkBorder
            rounded-md
            z-50
            backdrop-blur-sm
            ${props.size === "Big" ? `
            w-3/5 h-[90%]
            `
            : props.size === "Medium" ? `
            w-1/3 h-2/3
            `
            : props.size === "Small" ? `
            w-1/4 h-1/4
            `
            : props.size === "Tx" ? `
            w-1/4 h-1/3
            `
            : ""
            }
        `,
        titleCtn: `
            flex justify-between items-center w-full
            rounded-t-md
            border-b border-lightBorder dark:border-darkBorder
            p-2
            ${props.size === "Big" ? `
                xl:h-11 lg:h-10 md:h-8 sm:h-6`
            : props.size === "Medium" || props.size === "Small" || props.size === "Tx" ? `
                xl:h-10 lg:h-8 md:h-6 sm:h-4`
            :
            ""}
        `,
        closeBtn: `
            flex justify-center items-center
            hover:opacity-80 active:opacity-40
            bg-lightBgActive dark:bg-darkBgActive
            border border-lightBorder dark:border-darkBorder
            cursor-pointer
            rounded-md
            ${props.size === "Big" ? `
                xl:w-7 xl:h-7 lg:w-6 lg:h-6 md:w-5 md:h-5 sm:w-4 sm:h-4
            `
            : props.size === "Medium" || props.size === "Small" || props.size === "Tx" ? `
                xl:w-6 xl:h-6 lg:w-5 lg:h-5 md:w-4 md:h-4 sm:w-3 sm:h-3
            `
            : ""}
        `,
        closeIcon: `
            w-1/2 h-1/2 fill-lightBorder dark:fill-darkBorder
        `,

    }

    return (
        <div className={modalStyles.fullscreenBg}>
            <div id="modal" className={modalStyles.ctn}>
                <div className={modalStyles.titleCtn}>
                    <span>{props.title}</span>
                    {!props.closeBtnDisabled
                    &&
                    <div onClick={() => props.onClickClose()} className={modalStyles.closeBtn}>
                        <SvgIcon style={modalStyles.closeIcon} viewBox="0 0 121.31 122.876" pathD="M90.914,5.296c6.927-7.034,18.188-7.065,25.154-0.068 c6.961,6.995,6.991,18.369,0.068,25.397L85.743,61.452l30.425,30.855c6.866,6.978,6.773,18.28-0.208,25.247 c-6.983,6.964-18.21,6.946-25.074-0.031L60.669,86.881L30.395,117.58c-6.927,7.034-18.188,7.065-25.154,0.068 c-6.961-6.995-6.992-18.369-0.068-25.397l30.393-30.827L5.142,30.568c-6.867-6.978-6.773-18.28,0.208-25.247 c6.983-6.963,18.21-6.946,25.074,0.031l30.217,30.643L90.914,5.296L90.914,5.296z" />
                    </div>
                    }
                </div>
                {props.children}
            </div>
        </div>
    )


}


export default ModalSkeleton