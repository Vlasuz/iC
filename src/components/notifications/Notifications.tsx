import React, {useEffect, useState} from 'react'
import SimpleBar from "simplebar-react";
import {NotificationsStyled} from "./Notifications.styled";
import {useClickOutside} from "../../hooks/ClickOutside";

interface INotificationsProps {

}

export const Notifications: React.FC<INotificationsProps> = () => {

    const [isHaveNotice, setIsHaveNotice] = useState(true)
    const [isActive, setIsActive] = useState(false)

    useEffect(() => {
        if(!isActive) return;

        setIsHaveNotice(false)

    }, [isActive])

    const {rootEl} = useClickOutside(setIsActive)

    return (
        <NotificationsStyled ref={rootEl} className="section-table__header--col">
            <div className="section-table__notification notification drop-down-absolute">
                <button onClick={_ => setIsActive(prev => !prev)} className={`notification__target drop-down-absolute__target ${isHaveNotice && "is-has-notice"} ${isActive && "is-active"}`}
                        data-drop-down-target="notification-block" type="button">
                    <svg width="17" height="20" viewBox="0 0 17 20">
                        <use xlinkHref="#notification"></use>
                    </svg>
                </button>
                <div className={`notification__block drop-down-absolute__block is-right-default ${isActive && "is-active"}`} id="notification-block">
                    <h2 className="notification__block--title">
                        Your notifications
                    </h2>
                    <SimpleBar autoHide={false} className="notification__block--wrapper custom-scrollbar">
                        <ul className="notification__list">
                            <li>
                                <div className="notification__item">
                                    <div className="notification__block--text">
                                        <p>
                                            <b>You have a new comment from Irina Omelianenko:</b>
                                            No problems, take your time. Don’t forget please about the
                                            fact that 19th was weekend
                                        </p>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div className="notification__item">
                                    <div className="notification__block--icon is-success">
                                        <svg width="20" height="20" viewBox="0 0 20 20">
                                            <use xlinkHref="#round-check"></use>
                                        </svg>
                                    </div>
                                    <div className="notification__block--text">
                                        <p>
                                            Your timesheet for October was successfully approved!
                                        </p>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div className="notification__item">
                                    <div className="notification__block--icon is-danger">
                                        <svg width="20" height="20" viewBox="0 0 20 20">
                                            <use xlinkHref="#round-error"></use>
                                        </svg>
                                    </div>
                                    <div className="notification__block--text">
                                        <p>
                                            Your timesheet for September was rejected!
                                        </p>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div className="notification__item">
                                    <div className="notification__block--text">
                                        <p>
                                            <b>You have a new comment from Irina Omelianenko:</b>
                                            No problems, take your time. Don’t forget please about the
                                            fact that 19th was weekend
                                        </p>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div className="notification__item">
                                    <div className="notification__block--icon is-success">
                                        <svg width="20" height="20" viewBox="0 0 20 20">
                                            <use xlinkHref="#round-check"></use>
                                        </svg>
                                    </div>
                                    <div className="notification__block--text">
                                        <p>
                                            Your timesheet for October was successfully approved!
                                        </p>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div className="notification__item">
                                    <div className="notification__block--icon is-danger">
                                        <svg width="20" height="20" viewBox="0 0 20 20">
                                            <use xlinkHref="#round-error"></use>
                                        </svg>
                                    </div>
                                    <div className="notification__block--text">
                                        <p>
                                            Your timesheet for September was rejected!
                                        </p>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div className="notification__item">
                                    <div className="notification__block--text">
                                        <p>
                                            <b>You have a new comment from Irina Omelianenko:</b>
                                            No problems, take your time. Don’t forget please about the
                                            fact that 19th was weekend
                                        </p>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div className="notification__item">
                                    <div className="notification__block--icon is-success">
                                        <svg width="20" height="20" viewBox="0 0 20 20">
                                            <use xlinkHref="#round-check"></use>
                                        </svg>
                                    </div>
                                    <div className="notification__block--text">
                                        <p>
                                            Your timesheet for October was successfully approved!
                                        </p>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div className="notification__item">
                                    <div className="notification__block--icon is-danger">
                                        <svg width="20" height="20" viewBox="0 0 20 20">
                                            <use xlinkHref="#round-error"></use>
                                        </svg>
                                    </div>
                                    <div className="notification__block--text">
                                        <p>
                                            Your timesheet for September was rejected!
                                        </p>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </SimpleBar>
                </div>
            </div>
        </NotificationsStyled>
    )
}
