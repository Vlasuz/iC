import React, {useEffect} from 'react'
import {ITimesheet} from "../../../models";

interface ISummaryEmployeesStatusApprovedProps {
    itemData: ITimesheet
}

export const SummaryEmployeesStatusApproved: React.FC<ISummaryEmployeesStatusApprovedProps> = ({itemData}) => {

    return (
        <div className="summary-item__footer--col">
            <div className="summary-item__message is-success">
                <svg width="20" height="20" viewBox="0 0 13 13">
                    <use xlinkHref="#round-check"></use>
                </svg>
                <p>Your summary was approved! (by {itemData.manager.first_name} {itemData.manager.last_name})</p>
            </div>
        </div>
    )
}
