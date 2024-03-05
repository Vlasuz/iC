import React, {useEffect, useState} from 'react'
import {SummaryEmployeesButtons} from "./SummaryEmployeesButtons";
import {Translate} from "../../../components/translate/Translate";
import axios from "axios";
import {getApiLink} from "../../../functions/getApiLink";
import {SetSummaryEmployees} from "../../../api/SetSummaryEmployees";
import {useDispatch, useSelector} from 'react-redux';

interface ISummaryEmployeesChangeDecisionProps {
    itemData: any
    handleExportPdf: any
    isClickToExport: boolean
}

export const SummaryEmployeesChangeDecision: React.FC<ISummaryEmployeesChangeDecisionProps> = ({itemData, handleExportPdf, isClickToExport}) => {

    const dispatch = useDispatch()

    const chosenTimesheet = useSelector((state: any) => state.toolkit.chosenTimesheet)

    const handleChangeDecision = () => {
        axios.post(getApiLink(`/api/timesheet/employees/review/?timesheet_id=${itemData?.id}&status=waiting`)).then(({data}) => {
            if(!data?.status) return;

            const actualMonth = `${chosenTimesheet.date[3]}${chosenTimesheet.date[4]}`
            const actualYear = `20${chosenTimesheet.date[6]}${chosenTimesheet.date[7]}`

            SetSummaryEmployees(dispatch, +actualMonth, +actualYear)
        })
    }

    return (
        <div className="summary-item__footer--col">
            <button disabled={isClickToExport} onClick={handleExportPdf} className="summary-item__button btn is-grey is-transparent" type="button">
                Export monthly summary
                <svg width="16" height="17" viewBox="0 0 16 17">
                    <use xlinkHref="#download"></use>
                </svg>
            </button>
            <a onClick={handleChangeDecision} className="summary-item__button btn open-popup is-grey"
               type="button">
                <Translate>employees_page.table.change_decision</Translate>
            </a>
        </div>
    )
}
