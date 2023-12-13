import React, {useContext, useEffect} from 'react'
import axios from "axios";
import {getApiLink} from "../../../functions/getApiLink";
import {PopupClose} from "./PopupClose";
import {PopupCloseCancel} from "./PopupCloseCancel";
import {IsPopupActiveContext} from "../PopupList";
import {PopupContext} from "../../../App";

interface IPopupApproveTimesheetProps {
    data: any
}

export const PopupApproveTimesheet: React.FC<IPopupApproveTimesheetProps> = ({data}) => {

    const setIsPopupActive: any = useContext(IsPopupActiveContext)

    const sendOnApprove = () => {
        axios.post(getApiLink("/api/timesheet/my/send/?timesheet_id=" + data.id)).then(({data}) => {
            if (!data.status) return;

            setIsPopupActive(false)
        })
    }

    return (
        <div className="approve-timesheet__body popup-body">
            <PopupClose/>
            <div className="approve-timesheet__container popup-container" data-simplebar="init"
                 data-simplebar-auto-hide="false">
                <div className="simplebar-content">
                    <h2 className="approve-timesheet__title title popup-title">
                        You are going to send the timesheet for approving, continue?
                    </h2>
                    <div className="approve-timesheet__buttons">
                        <PopupCloseCancel/>
                        <button onClick={sendOnApprove} className="approve-timesheet__submit btn" type="submit">
                            Continue
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
