import React from 'react'
import {ITimesheet} from "../../../models";
import {Translate} from "../../../components/translate/Translate";

interface ISummaryEmployeesStatusRejectedProps {
    itemData: ITimesheet
}

export const SummaryEmployeesStatusRejected: React.FC<ISummaryEmployeesStatusRejectedProps> = ({itemData}) => {

    const itemDate = itemData.updated_at;
    const dateForStatus = `${itemDate[3] + itemDate[4]} / ${itemDate[0] + itemDate[1]} / 20${itemDate[6] + itemDate[7]}`

    return (
        <div className="summary-item__footer--col">
            <div className="summary-item__message is-danger">
                <svg width="20" height="20" viewBox="0 0 13 13">
                    <use xlinkHref="#round-error"></use>
                </svg>
                {/*on {dateForStatus}.*/}
                <p><Translate>employees_page.table.summary_already_rejected</Translate> {itemData?.manager?.first_name} {itemData?.manager?.last_name}</p>
            </div>
        </div>
    )
}
