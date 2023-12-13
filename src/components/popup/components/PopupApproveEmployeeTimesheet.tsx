import React, {useContext, useEffect} from 'react'
import {PopupClose} from "./PopupClose";
import {PopupCloseCancel} from "./PopupCloseCancel";
import {IsPopupActiveContext} from "../PopupList";

interface IPopupApproveThankYouTimesheetProps {
    data: any
}

export const PopupApproveEmployeeTimesheet: React.FC<IPopupApproveThankYouTimesheetProps> = ({data}) => {

    const setIsPopupActive: any = useContext(IsPopupActiveContext)

    const closePopup = () => {
        setIsPopupActive(false)
    }

    return (
        <div className="approve-timesheet__body popup-body">
            <PopupClose/>
            <div className="approve-timesheet__container popup-container" data-simplebar="init"
                 data-simplebar-auto-hide="false">
                <div className="simplebar-content">
                    <h2 className="approve-timesheet__title title popup-title">
                        Thank you!
                    </h2>
                    <p className={"text popup-text"}>
                        This timesheet is successfully approved. <br />{data.manager.first_name} will get the notification on her mail.
                    </p>
                    <div className="approve-timesheet__buttons">
                        <PopupCloseCancel/>
                        <button onClick={closePopup} className="approve-timesheet__submit btn" type="submit">
                            Continue
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
