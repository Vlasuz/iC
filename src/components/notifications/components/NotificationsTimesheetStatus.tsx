import React from 'react'
import {INotification} from "../../../models";
import {MonthNumber} from "../../../constants/MonthNumber";
import {useTranslation} from "react-i18next";

interface INotificationsTimesheetStatusProps {
    itemData: INotification
}

export const NotificationsTimesheetStatus: React.FC<INotificationsTimesheetStatusProps> = ({itemData}) => {

    const timesheetMonth = MonthNumber()[+`${itemData.timesheet.date[3]}${itemData.timesheet.date[4]}`]

    const { t } = useTranslation();

    const statusText: any = {
        "reject": `${t('timesheet_page.notifications.your_timesheet_rejected')}`.replace("[month]", t(timesheetMonth.translate_code)).replace("[місяць]", t(timesheetMonth.translate_code)),
        "approve": `${t('timesheet_page.notifications.your_timesheet_approved')}`.replace("[month]", t(timesheetMonth.translate_code)).replace("[місяць]", t(timesheetMonth.translate_code)),
    }

    const statusIcon: any = {
        "reject": "#round-error",
        "approve": "#round-check",
    }

    const statusIconClass: any = {
        "approve": "is-success",
        "reject": "is-danger",
    }

    return (
        <div className="notification__item">
            <div className={`notification__block--icon ${statusIconClass[itemData.type]}`}>
                <svg width="20" height="20" viewBox="0 0 20 20">
                    <use xlinkHref={statusIcon[itemData.type]}></use>
                </svg>
            </div>
            <div className="notification__block--text">
                <p>
                    {statusText[itemData.type]}
                </p>
            </div>
        </div>
    )
}
