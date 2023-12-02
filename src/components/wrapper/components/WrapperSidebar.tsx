import React, {ReactNode, useEffect} from 'react'
import {Aside} from "../../aside/Aside";
import {
    TransitionGroup,
    CSSTransition
} from "react-transition-group";
import {useLocation} from "react-router-dom";

interface IWrapperSidebarProps {
    children: ReactNode
}

export const WrapperSidebar: React.FC<IWrapperSidebarProps> = ({children}) => {

    const location = useLocation()

    return (
        <div className="wrapper">
            <Aside/>

            <TransitionGroup component={null}>
                <CSSTransition key={location.pathname} classNames="fade" timeout={300}>

                    <main className="main simplebar-scrollable-y" data-simplebar="init">
                        <div className="simplebar-wrapper" style={{margin: "-30px -50px"}}>
                            <div className="simplebar-height-auto-observer-wrapper">
                                <div className="simplebar-height-auto-observer"></div>
                            </div>
                            <div className="simplebar-mask">
                                <div className="simplebar-offset" style={{right: "0px", bottom: "0px"}}>
                                    <div className="simplebar-content-wrapper" tabIndex={0} role="region"
                                         aria-label="scrollable content"
                                         style={{height: "100%", overflow: "hidden scroll"}}>
                                        <div className="simplebar-content" style={{padding: "30px 50px"}}>
                                            {children}

                                            {/*<DownSidebar/>*/}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="simplebar-placeholder" style={{width: "1570px", height: "1855px"}}></div>
                        </div>
                        <div className="simplebar-track simplebar-horizontal" style={{visibility: "hidden"}}>
                            <div className="simplebar-scrollbar simplebar-visible"
                                 style={{width: "0px", display: "none"}}></div>
                        </div>
                        <div className="simplebar-track simplebar-vertical" style={{visibility: "visible"}}>
                            <div className="simplebar-scrollbar simplebar-visible" style={{
                                height: "160px",
                                transform: "translate3d(0px, 0px, 0px)",
                                display: "block"
                            }}></div>
                        </div>
                    </main>

                </CSSTransition>
            </TransitionGroup>

        </div>
    )
}
