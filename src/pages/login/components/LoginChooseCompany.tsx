import React, {useEffect, useState} from 'react'
import {NavLink} from "react-router-dom";
import {useClickOutside} from "../../../hooks/ClickOutside";

interface ILoginChooseCompanyProps {

}

export const LoginChooseCompany: React.FC<ILoginChooseCompanyProps> = () => {

    const [isSelectOpen, setIsSelectOpen] = useState(false)

    const {rootEl} = useClickOutside(setIsSelectOpen)

    return (
        <div ref={rootEl} className={"login__drop-down drop-down select-drop-down" + (isSelectOpen ? " is-active" : "")}>
            <button className="drop-down__target select-drop-down__target" onClick={_ => setIsSelectOpen(prev => !prev)} type="button"
                    aria-label="iC Ukraine">
                <span>iC Ukraine</span>
                <svg width="10" height="7" viewBox="0 0 10 7"
                     className="drop-down__target--arrow select-drop-down__target--arrow">
                    <use xlinkHref="#drop-down-arrow"></use>
                </svg>
            </button>
            <div className="drop-down__block select-drop-down__block">
                <ul className="drop-down__list">
                    <li>
                        <NavLink to="/login-2">
                            CES clean energy solutions
                        </NavLink>
                    </li>
                </ul>
            </div>
        </div>
    )
}
