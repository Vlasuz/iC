import React, {useEffect, useState} from 'react'
import {SummaryEmployeesButtons} from "./SummaryEmployeesButtons";
import {Translate} from "../../../components/translate/Translate";
import axios from "axios";
import {getApiLink} from "../../../functions/getApiLink";
import {SetSummaryEmployees} from "../../../api/SetSummaryEmployees";
import { useDispatch } from 'react-redux';

interface ISummaryEmployeesChangeDecisionProps {
    itemData: any
}

export const SummaryEmployeesChangeDecision: React.FC<ISummaryEmployeesChangeDecisionProps> = ({itemData}) => {

    const dispatch = useDispatch()

    const handleChangeDecision = () => {
        axios.post(getApiLink(`/api/timesheet/employees/review/?timesheet_id=${itemData?.id}&status=progress`)).then(({data}) => {
            if(!data?.status) return;

            SetSummaryEmployees(dispatch)
        })
    }

    return (
        <div className="summary-item__footer--col">
            <button className="summary-item__button btn is-grey is-transparent" type="button">
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
