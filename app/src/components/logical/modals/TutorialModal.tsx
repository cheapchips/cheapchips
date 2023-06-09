import { useState } from "react"
import SvgIcon from "../../layout/SvgIcon"
import ModalSkeleton from "../ModalSkeleton"

const tutorialStyles = {
    ctn: `
        flex justify-center content-center items-center
        xl:p-2
        md:p-1
        grow
        select-none
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
        w-3 h-3
        rounded-full
        border border-lightBorder dark:border-darkBorder
    `,
    navDotActive: `
        bg-accentColor
        dark:bg-accentColor
    `,
    navArrowCtn: `
        p-3
        cursor-pointer
    `,
    navArrow: `
        w-4 h-4
        fill-lightBorder
        dark:fill-darkBorder
    `,


    tutorialContentCtn: `
        flex flex-col justify-center items-center 
        w-3/4 xl:leading-9 lg:leading-6 md:leading-4 xl:text-lg lg:text-sm md:text-xxs sm:text-xxxxs
    `,
}

const TutorialIntro = (props:{onClickSkip:() => void}) => {

    return (
        <div className={tutorialStyles.tutorialContentCtn}>
            <span>Welcome to <span className="text-accentColor">CheapChips {`👋`}</span>!</span>
            <span>Before you play, we'd like to introduce the game system to you.</span>
            <span>You can <button onClick={props.onClickSkip} className="border px-3 rounded-md border-lightBorder dark:border-darkBorder">skip</button> this tutorial if you prefer.</span>
        
            <br />
            <span>Now, let's get started!</span>
            <span>Use the navigation bar at the bottom to move through the tutorial.</span>
            <span className="underline underline-offset-4">You can always go back to previous steps!</span>
        </div>
    )
}

const TutorialPage1 = () => {
    
    return (
        <div className={tutorialStyles.tutorialContentCtn}>

            <span>First, you'll need to get some MATIC and LINK</span>
            <span>(if you have some already, you can skip this step).</span>
            <span>Check out this quick video: </span>
            <br />
                <iframe width="720" height="420" src="https://www.youtube.com/embed/GLxcJ3cJ_Nk" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen={true} ></iframe>
            <br />
            <span>Once you obtain some LINK and MATIC, move on to the next step {`😀`}</span>

        </div>
    )
    
}

const TutorialPage2 = () => {
    
    return (
        <div className={tutorialStyles.tutorialContentCtn}>
            
            <span className="text-center">Nice! now that we have some MATIC, we can go ahead and mint some CHIPS</span>
            <span>Here's a video showing you how to do that: </span>
            <br />
                <iframe width="720" height="420" src="https://www.youtube.com/embed/rj-4Hk6d8E8" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen={true} ></iframe>
            <br />

            <span>Now it's time for the final step. Let's go! 🏃‍♀️</span>


        </div>
    )
}

const TutorialPage3 = () => {

    return (
        <div className={tutorialStyles.tutorialContentCtn}>
            
            <span>Okay, final step!</span>
            <span>It's time to deposit some LINK tokens to contract's service fees pool</span>
            <span className="text-center">(!) This way, the contract can be more efficient with LINK service fees, and we only have to deposit the LINK once.</span>
            <br />
                <iframe width="720" height="420" src="https://www.youtube.com/embed/WNCLErOrtks" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen={true} ></iframe>
            <br />

            <span>Ok, that wasn't so hard! Now we're able to play 😀</span>


        </div>
    )
}

const TutorialPage4 = () => {
    
    return (
        <div className={tutorialStyles.tutorialContentCtn}>
            
            <span>All done!</span>
            <span>Here's a bonus deposit & gameplay demo: </span>
            <br />
                <iframe width="720" height="420" src="https://www.youtube.com/embed/dvChWcCpEk0" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen={true} ></iframe>
            <br />

            <span>Good luck and have fun! 😎</span>


        </div>
    )
}

const TutorialModal = (
    props: {
        pages: number
        onClickClose: () => void,
    }
) => {

    const [currentPage, setCurrentPage] = useState<number>(0)


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
            return
        }
        (dir === "left" ? setCurrentPage(currentPage-1) : setCurrentPage(currentPage+1))
    }

    const renderTutorialPages = () => {
        switch(currentPage){
            case 0:
                return <TutorialIntro onClickSkip={() => props.onClickClose()}/>
            case 1:
                return <TutorialPage1 />
            case 2:
                return <TutorialPage2 />
            case 3:
                return <TutorialPage3 />
            case 4:
                return <TutorialPage4 />
            default:
                return null;
        }
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
            <div className={tutorialStyles.navArrowCtn} onClick={() => navigatePages(props.dir)}>
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
        <ModalSkeleton title="Tutorial" size={'Big'} closeBtnDisabled={currentPage === props.pages - 1 ? false : true} onClickClose={() => props.onClickClose()}>
            
            <div className={tutorialStyles.ctn}>
                {renderTutorialPages()}
            </div>
            
            <div className={tutorialStyles.navCtn}>
                <TutorialNavigationPanel />           
            </div>

        </ModalSkeleton>

    )


}


export default TutorialModal


