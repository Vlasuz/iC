import React, {ReactNode, useEffect} from 'react'
import SimpleBar from "simplebar-react";

interface IWrapperLoginProps {
    children: ReactNode
}

export const WrapperLogin: React.FC<IWrapperLoginProps> = ({children}) => {

    return (
        <div className="wrapper login-wrapper">
            <SimpleBar autoHide={false}>
                <main className="main is-none-aside">
                    <div className="simplebar-mask">
                        <div className="simplebar-offset">
                            <div className="simplebar-content-wrapper" tabIndex={0} role="region"
                                 aria-label="scrollable content">
                                <div className="simplebar-content">
                                    {children}
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </SimpleBar>
        </div>
    )
}
