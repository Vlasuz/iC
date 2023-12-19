import React, {useEffect, useState} from 'react'
import {SummaryEmployeesButtons} from "./SummaryEmployeesButtons";
import {Translate} from "../../../components/translate/Translate";

interface ISummaryEmployeesChangeDecisionProps {
    setIsChangeDecision: any
}

export const SummaryEmployeesChangeDecision: React.FC<ISummaryEmployeesChangeDecisionProps> = ({setIsChangeDecision}) => {

    return (
        <div className="summary-item__footer--col">
            <button className="summary-item__button btn is-grey is-transparent" type="button">
                Export monthly summary
                <svg width="16" height="17" viewBox="0 0 16 17">
                    <use xlinkHref="#download"></use>
                </svg>
            </button>
            <a onClick={_ => setIsChangeDecision(true)} className="summary-item__button btn open-popup is-grey"
               type="button">
                <Translate>employees_page.table.change_decision</Translate>
            </a>
        </div>
    )
}
