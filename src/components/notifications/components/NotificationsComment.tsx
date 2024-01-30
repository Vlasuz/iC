import React, {useEffect, useState} from 'react'
import {useSelector} from 'react-redux';
import {INotification, IUser} from "../../../models";
import {Translate} from "../../translate/Translate";

interface INotificationsCommentProps {
    itemData: INotification
}

export const NotificationsComment: React.FC<INotificationsCommentProps> = ({itemData}) => {

    return (
        <div className="notification__item">
            <div className="notification__block--text">
                <p>

                    <b>
                        {itemData?.comment?.answer === null ? <Translate>timesheet_page.notifications.you_have_a_new_comment_from</Translate> : <Translate>timesheet_page.notifications.you_have_a_new_response_from</Translate>} {itemData?.comment?.user?.first_name} {itemData?.comment?.user?.last_name}: </b>
                    {itemData?.comment?.text}
                </p>
            </div>
        </div>
    )
}
