import React, {useContext, useEffect} from 'react'
import axios from "axios";
import {getApiLink} from "../../../functions/getApiLink";
import {PopupClose} from "./PopupClose";
import {PopupCloseCancel} from "./PopupCloseCancel";
import {IsPopupActiveContext} from "../PopupList";
import {PopupContext} from "../../../App";
import {SetTimesheet} from "../../../api/SetTimesheet";
import { useDispatch } from 'react-redux';
import {Translate} from "../../translate/Translate";

interface IPopupApproveTimesheetProps {
    data: any
}

export const PopupApproveTimesheet: React.FC<IPopupApproveTimesheetProps> = ({data}) => {

    const setIsPopupActive: any = useContext(IsPopupActiveContext)

    const dispatch = useDispatch()

    const sendOnApprove = () => {
        axios.post(getApiLink("/api/timesheet/my/send/?timesheet_id=" + data.id)).then(({data}) => {
            if (!data.status) return;

            SetTimesheet(dispatch)

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
                        <Translate>summary_page.other.confirm_send_timesheet</Translate>
                    </h2>
                    <div className="approve-timesheet__buttons">
                        <PopupCloseCancel/>
                        <button onClick={sendOnApprove} className="approve-timesheet__submit btn" type="submit">
                            <Translate>summary_page.other.continue</Translate>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
