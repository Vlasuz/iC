import React, {useContext, useEffect} from 'react'
import {PopupClose} from "./PopupClose";
import {PopupCloseCancel} from "./PopupCloseCancel";
import {IsPopupActiveContext} from "../PopupList";
import axios from "axios";
import {getApiLink} from "../../../functions/getApiLink";
import {SetSummaryEmployees} from "../../../api/SetSummaryEmployees";
import {useDispatch, useSelector} from 'react-redux';
import {Translate} from "../../translate/Translate";

interface IPopupReviewToTimesheetProps {
    data: any
}

export const PopupReviewToTimesheet: React.FC<IPopupReviewToTimesheetProps> = ({data}) => {

    const setIsPopupActive: any = useContext(IsPopupActiveContext)

    const chosenTimesheet = useSelector((state: any) => state.toolkit.chosenTimesheet)

    const dispatch = useDispatch()

    const handleReview = () => {
        axios.post(getApiLink(`/api/timesheet/employees/review/?timesheet_id=${data?.timesheetId}&status=${data.status}`)).then(({data}) => {
            if(!data?.status) return;

            const actualMonth = `${chosenTimesheet.date[3]}${chosenTimesheet.date[4]}`
            const actualYear = `20${chosenTimesheet.date[6]}${chosenTimesheet.date[7]}`

            SetSummaryEmployees(dispatch, +actualMonth, +actualYear)

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

                        {
                            data.status === "approve" ? <Translate>employees_page.other.confirm_approve_timesheet</Translate> : <Translate>employees_page.other.confirm_reject_timesheet</Translate>
                        }

                    </h2>
                    <div className="approve-timesheet__buttons">
                        <PopupCloseCancel/>
                        <button onClick={handleReview} className="approve-timesheet__submit btn" type="submit">
                            <Translate>employees_page.other.continue</Translate>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
