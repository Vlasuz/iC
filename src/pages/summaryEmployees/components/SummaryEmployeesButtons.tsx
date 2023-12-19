import React, {useContext, useEffect} from 'react'
import axios from "axios";
import {getApiLink} from "../../../functions/getApiLink";
import {PopupContext} from "../../../App";
import {Translate} from "../../../components/translate/Translate";

interface ISummaryEmployeesButtonsProps {
    timesheetId: string
}

export const SummaryEmployeesButtons: React.FC<ISummaryEmployeesButtonsProps> = ({timesheetId}) => {

    const setPopup: any = useContext(PopupContext)

    const handleReviewTimesheet = (status: string) => {
        setPopup({
            popup: "review-employee-timesheet-popup", data: {
                timesheetId,
                status
            }
        })
    }

    return (
        <div className="summary-item__footer--col add-cols">
            <button className="summary-item__button btn is-grey is-transparent" type="button">
                <Translate>summary_page.main.export_monthly_summary</Translate>
                <svg width="16" height="17" viewBox="0 0 16 17">
                    <use xlinkHref="#download"></use>
                </svg>
            </button>
            <a onClick={_ => handleReviewTimesheet('approve')}
               className="summary-item__button btn open-popup is-success" type="button">
                <Translate>employees_page.table.approved</Translate>
                <svg width="16" height="17" viewBox="0 0 20 20">
                    <use xlinkHref="#round-check"></use>
                </svg>
            </a>
            <a onClick={_ => handleReviewTimesheet('reject')}
                className="summary-item__button btn is-error open-popup"
               type="button">
                <Translate>employees_page.table.rejected</Translate>
            </a>
        </div>
    )
}
