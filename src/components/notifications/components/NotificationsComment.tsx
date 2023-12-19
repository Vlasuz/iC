import React, {useEffect} from 'react'
import {INotification} from "../../../models";
import {Translate} from "../../translate/Translate";

interface INotificationsCommentProps {
    itemData: INotification
}

export const NotificationsComment: React.FC<INotificationsCommentProps> = ({itemData}) => {

    return (
        <div className="notification__item">
            <div className="notification__block--text">
                <p>
                    <b> <Translate>timesheet_page.notifications.you_have_a_new_comment_from</Translate>
                        {itemData?.comment?.answer?.first_name} {itemData?.comment?.answer?.last_name}:</b>
                    {itemData?.comment?.text}
                </p>
            </div>
        </div>
    )
}
