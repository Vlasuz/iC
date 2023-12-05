import React, {useContext, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux';
import {IUser} from "../../models";
import {NavLink, useNavigate} from "react-router-dom";

import logo_avif from './../../assets/html/img/logo.avif'
import logo_webp from './../../assets/html/img/logo.webp'
import logo_png from './../../assets/html/img/logo.png'
import setCookie from "../../functions/setCookie";
import {AsideLanguages} from "./components/AsideLanguages";
import {PopupContext} from "../../App";

interface IAsideProps {

}

export const Aside: React.FC<IAsideProps> = () => {

    useEffect(() => {
        if (localStorage.getItem('ic11-aside-min') == "true") {
            // @ts-ignore
            document.querySelector('.aside').classList.add('is-min');
            // @ts-ignore
            document.querySelector('.aside').classList.add('is-min-2');
            // @ts-ignore
            document.querySelector('html').style.setProperty('--aside-width', '65px');
        }
    }, [])

    const userData: IUser = useSelector((state: any) => state.toolkit.user)
    const navigate = useNavigate()

    const handleExit = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault()

        setCookie("access_token", "")
        navigate("/login")
    }

    const menuList = [
        {
            label: "Employees",
            link: "/employees",
            icon: "#members",
            isActive: !!Object.keys(userData).length && userData.role?.includes("admin")
        },
        {
            label: "Vacations",
            link: "/vacations",
            icon: "#calendar-check",
            isActive: !!Object.keys(userData).length && userData.role?.includes("admin")
        },
        {
            label: "Projects",
            link: "/projects",
            icon: "#calendar-selected",
            isActive: !!Object.keys(userData).length && userData.role?.includes("admin")
        },
        {
            label: "Timesheet",
            link: "/",
            icon: "#timesheet",
            isActive: !!Object.keys(userData).length
        },
        {
            label: "Costs",
            link: "/costs",
            icon: "#costs",
            isActive: !!Object.keys(userData).length
        },
        {
            label: "Summary",
            link: "/summary",
            icon: "#calendar-table",
            isActive: !!Object.keys(userData).length
        },
    ]

    const setPopup: any = useContext(PopupContext)

    return (
        <aside className="aside">
            <button className="aside__slide-toggle" type="button">
                <svg width="10" height="7" viewBox="0 0 10 7">
                    <use xlinkHref="#drop-down-arrow"></use>
                </svg>
            </button>
            <div className="aside__background" aria-hidden="true"></div>
            <div className="aside__body" data-simplebar>
                <div className="aside__body--wrapper">
                    <div className="aside__header">
                        <div className="aside__logo">
                            <NavLink to={"/employees"} className="aside__logo--link">
                                <picture>
                                    <source srcSet={logo_avif} type="image/avif"/>
                                    <source srcSet={logo_webp} type="image/webp"/>
                                    <img src={logo_png} alt="" width="40" height="40" loading="lazy"
                                         className="aside"/>
                                </picture>
                            </NavLink>
                        </div>
                        <button className="aside__burger" type="button" aria-label="Menu">
                            <span></span>
                            <span></span>
                            <span></span>
                        </button>
                    </div>
                    <div className="aside__block">
                        <div className="aside__block--background"></div>
                        <div className="aside__block--body">
                            <nav className="aside__nav">
                                <ul>

                                    {
                                        menuList.map(item => item.isActive &&
                                            <li key={item.link}>
                                                <NavLink to={item.link} className={({isActive}) => isActive ? "is-current" : ""} aria-label="Employees">
                                                    <svg width="25" height="25" viewBox="0 0 25 25">
                                                        <use xlinkHref={item.icon}></use>
                                                    </svg>
                                                    <span>{item.label}</span>
                                                </NavLink>
                                            </li>
                                        )
                                    }

                                </ul>
                            </nav>
                            <div className="aside__add">
                                <div className="aside__add--row">
                                    <button onClick={_ => setPopup({popup: "profile-popup"})} className="aside__user"
                                       aria-label={`${userData?.first_name} ${userData?.last_name}`}>
                                        <div className="aside__user--avatar" style={{background: "#EF3129"}}>
                                            {userData?.first_name && (userData?.first_name[0] + userData?.last_name[0])}
                                        </div>
                                        <strong className="aside__user--name">
                                            {userData?.first_name} {userData?.last_name}
                                        </strong>
                                    </button>
                                    <a onClick={handleExit} className="aside__log-out visible-on-mob">
                                        <svg width="16" height="17" viewBox="0 0 16 17">
                                            <use xlinkHref="#logout"></use>
                                        </svg>
                                        Log out
                                    </a>
                                </div>
                                <div className="aside__change-on-min visible-on-desktop">
                                    <div>
                                        <a onClick={handleExit} className="aside__log-out">
                                            <svg width="16" height="17" viewBox="0 0 16 17">
                                                <use xlinkHref="#logout"></use>
                                            </svg>
                                            Log out
                                        </a>
                                    </div>
                                    <div>
                                        <a onClick={handleExit} className="aside__log-out is-min" aria-label="Log out">
                                            <svg width="16" height="17" viewBox="0 0 16 17">
                                                <use xlinkHref="#logout"></use>
                                            </svg>
                                        </a>
                                    </div>
                                </div>

                                <AsideLanguages/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </aside>
    )
}
