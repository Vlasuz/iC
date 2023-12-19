import React, {useEffect} from 'react'
import {ITimesheet} from "../../../models";

interface ISummaryEmployeesStatusRejectedProps {
    itemData: ITimesheet
}

export const SummaryEmployeesStatusRejected: React.FC<ISummaryEmployeesStatusRejectedProps> = ({itemData}) => {

    const itemDate = itemData.updated_at;
    const dateForStatus = `${itemDate[0] + itemDate[1]}/${itemDate[3] + itemDate[4]}/20${itemDate[6] + itemDate[7]}`

    return (
        <div className="summary-item__footer--col">
            <div className="summary-item__message is-danger">
                <svg width="20" height="20" viewBox="0 0 13 13">
                    <use xlinkHref="#round-error"></use>
                </svg>
                <p>This summary already rejected by {itemData.manager.first_name} {itemData.manager.last_name} on {dateForStatus}.</p>
            </div>
        </div>
    )
}
