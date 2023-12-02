import React, {ReactChildren, ReactNode, useEffect} from 'react'
import {Login} from "../../pages/login/Login";
import {Aside} from "../aside/Aside";
import {DownSidebar} from "../downSidebar/DownSidebar";
import {WrapperLogin} from "./components/WrapperLogin";
import {WrapperSidebar} from "./components/WrapperSidebar";

interface IWrapperProps {
    children: ReactNode
}

export const Wrapper: React.FC<IWrapperProps> = ({children}) => {

    return (
        <>
            {
                window.location.href.includes('login') ? <WrapperLogin children={children}/> : <WrapperSidebar children={children}/>
            }
        </>
    )
}
