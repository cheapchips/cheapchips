import { useState, useEffect } from "react"
import Modal from "./Modal"
import SvgIcon from "../layout/SvgIcon"

const TutorialModal = (
    props: {
        pages: number
        title: string,
        size: "Big" | "Medium" | "Small",
        onClickClose: () => void,
    }
) => {

    const [currentPage, setCurrentPage] = useState<number>(0)

    const tutorialStyles = {
        ctn: `
            flex justify-center items-center
            xl:p-2
            md:p-1
            grow
        `,
        navCtn: `
            flex justify-center items-center
            xl:h-12
            lg:h-10
            md:h-8
        `,
        navPanelCtn: `
            flex flex-flow-row justify-center items-center gap-1
        `,
        navDot: `
            flex
            w-6 h-6
            rounded-full
            bg-lightText
            dark:bg-darkText
        `,
        navDotActive: `
            bg-sky-500
            dark:bg-sky-500
        `,
        navArrow: `
            w-6 h-6
            fill-lightText
            dark:fill-darkText
            cursor-pointer
        `,
    }

    // This will be needed for non-tutorial modals later (Click on dot[x] => moves to page[x])

    // function navigatePages(toPage:number):void {
    //     if((currentPage === 0 && toPage < currentPage) || (currentPage === props.pages && toPage > currentPage)){
    //         console.log('invalid navigation attempt')
    //         return
    //     }
    //     setCurrentPage(toPage)
    // }

    function navigatePages(dir: "left" | "right" ):void {
        if((currentPage === 0 && dir === "left") || (currentPage === (props.pages -1) && dir === "right")){
            console.log('invalid navigation attempt')
            return
        }
        (dir === "left" ? setCurrentPage(currentPage-1) : setCurrentPage(currentPage+1))
    }
    
    const NavigationArrow = (props: {dir: "left" | "right"}) => {

        const iconsData = {
            left: {
                viewBox: "0 0 66.91 122.8",
                pathD: "M64.96,111.2c2.65,2.73,2.59,7.08-0.13,9.73c-2.73,2.65-7.08,2.59-9.73-0.14L1.97,66.01l4.93-4.8l-4.95,4.8 c-2.65-2.74-2.59-7.1,0.15-9.76c0.08-0.08,0.16-0.15,0.24-0.22L55.1,2.09c2.65-2.73,7-2.79,9.73-0.14 c2.73,2.65,2.78,7.01,0.13,9.73L16.5,61.23L64.96,111.2L64.96,111.2L64.96,111.2z"
            },
            right: {
                viewBox: "0 0 66.91 122.88",
                pathD: "M1.95,111.2c-2.65,2.72-2.59,7.08,0.14,9.73c2.72,2.65,7.08,2.59,9.73-0.14L64.94,66l-4.93-4.79l4.95,4.8 c2.65-2.74,2.59-7.11-0.15-9.76c-0.08-0.08-0.16-0.15-0.24-0.22L11.81,2.09c-2.65-2.73-7-2.79-9.73-0.14 C-0.64,4.6-0.7,8.95,1.95,11.68l48.46,49.55L1.95,111.2L1.95,111.2L1.95,111.2z",
            }
        }

        return (
            <div onClick={() => navigatePages(props.dir)}>
                <SvgIcon
                    style={tutorialStyles.navArrow}
                    viewBox={iconsData[props.dir].viewBox}
                    pathD={iconsData[props.dir].pathD}
                />
            </div>
        )
    }

    const TutorialNavigationPanel = () => {
        const pages = Array(props.pages).fill(null).map((_, i) => i);
        const navigationDots = pages.map(index =>
            <div
                key={index}
                className={(index === currentPage) ? tutorialStyles.navDot + tutorialStyles.navDotActive : tutorialStyles.navDot}>
            </div>
        )

        return (
            <div className={tutorialStyles.navPanelCtn}>
                <NavigationArrow dir="left" />
                {navigationDots}
                <NavigationArrow dir="right" />
            </div>
        )
    }

    return (
        <Modal title={props.title} size={props.size} onClickClose={props.onClickClose} >
            
            <div className={tutorialStyles.ctn}>
                Current page: {currentPage}
            </div>
            <div className={tutorialStyles.navCtn}>
                <TutorialNavigationPanel />           
            </div>

        </Modal>            

    )


}


export default TutorialModal


