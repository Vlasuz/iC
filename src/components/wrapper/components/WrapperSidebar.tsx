import React, {ReactNode, useEffect, useState} from 'react'
import {Aside} from "../../aside/Aside";
import {
    TransitionGroup,
    CSSTransition
} from "react-transition-group";
import {useLocation} from "react-router-dom";
import SimpleBar from "simplebar-react";
import {WrapperStyled} from "../Wrapper.styled";
import { DownSidebar } from '../../downSidebar/DownSidebar';

interface IWrapperSidebarProps {
    children: ReactNode
}

export const WrapperSidebar: React.FC<IWrapperSidebarProps> = ({children}) => {

    const location = useLocation()
    const [isOpenDownSidebar, setIsOpenDownSidebar] = useState(false)

    return (
        <WrapperStyled className="wrapper">
            <Aside/>

            <TransitionGroup component={null}>
                <CSSTransition key={location.pathname} classNames="fade" timeout={300}>

                    <SimpleBar className={"main"}>

                        <div className="main__inner">
                            {children}

                            {/*{*/}
                            {/*    (location.pathname === "/" || location.pathname.includes("costs")) && <DownSidebar setIsOpenDownSidebar={setIsOpenDownSidebar}/>*/}
                            {/*}*/}

                        </div>

                    </SimpleBar>

                </CSSTransition>
            </TransitionGroup>

        </WrapperStyled>
    )
}