import React, {useEffect, useState} from 'react'
import SimpleBar from "simplebar-react";
import {NotificationsStyled} from "./Notifications.styled";
import {useClickOutside} from "../../hooks/ClickOutside";
import axios from "axios";
import {getApiLink} from "../../functions/getApiLink";
import {getBearer} from "../../functions/getBearer";
import {INotification} from "../../models";
import {NotificationsComment} from "./components/NotificationsComment";
import {NotificationsTimesheetStatus} from "./components/NotificationsTimesheetStatus";
import {Translate} from "../translate/Translate";

interface INotificationsProps {

}

export const Notifications: React.FC<INotificationsProps> = () => {

    const [isHaveNotice, setIsHaveNotice] = useState(true)
    const [isActive, setIsActive] = useState(false)
    const [notifications, setNotifications] = useState<INotification[] | undefined>([])

    useEffect(() => {

        if(notifications?.some(item => !item.viewed)) {
            setIsHaveNotice(true)
        } else {
            setIsHaveNotice(false)
        }

    }, [notifications])

    const {rootEl} = useClickOutside(setIsActive)

    useEffect(() => {
        getBearer("get")
        axios.get(getApiLink(`/api/user/notifications/`)).then(({data}) => {
            console.log(data)
            setNotifications(data)
        })
    }, [])

    const notifyType: any = (data: INotification) => {
        return {
            "comment": <NotificationsComment itemData={data}/>,
            "reject": <NotificationsTimesheetStatus itemData={data}/>,
            "approve": <NotificationsTimesheetStatus itemData={data}/>
        }
    }

    const handleOpenNotifications = () => {
        setIsActive(prev => !prev)

        // console.log(notifications?.map(item => item.id))
        // getBearer("post")
        // axios.post(getApiLink("/api/user/notifications/view/"), notifications?.map(item => item.id)).then(({data}) => {
        //     console.log(data)
        //     setIsHaveNotice(false)
        // }).catch(er => console.log(er))
    }

    return (
        <NotificationsStyled ref={rootEl} className="section-table__header--col">
            <div className="section-table__notification notification drop-down-absolute">
                <button onClick={handleOpenNotifications}
                        className={`notification__target drop-down-absolute__target ${isHaveNotice && "is-has-notice"} ${isActive && "is-active"}`}
                        data-drop-down-target="notification-block" type="button">
                    <svg width="17" height="20" viewBox="0 0 17 20">
                        <use xlinkHref="#notification"></use>
                    </svg>
                </button>
                <div
                    className={`notification__block drop-down-absolute__block is-right-default ${isActive && "is-active"}`}
                    id="notification-block">
                    <h2 className="notification__block--title">
                        <Translate>timesheet_page.notifications.your_notifications</Translate>
                    </h2>
                    <SimpleBar autoHide={false} className="notification__block--wrapper custom-scrollbar">
                        <ul className="notification__list">

                            {
                                notifications?.map(item =>
                                    <li key={item.id}>
                                        {notifyType(item)[item.type]}
                                    </li>
                                )
                            }

                        </ul>
                    </SimpleBar>
                </div>
            </div>
        </NotificationsStyled>
    )
}
