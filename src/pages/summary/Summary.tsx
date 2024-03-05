import React, {useEffect, useState} from 'react'
import { NavLink } from 'react-router-dom';
import {SummaryStyled} from "./Summary.styled";
import {SummaryItem} from "./components/SummaryItem";
import {TableSelectYear} from "../../components/table/TableSelectYear";
import {TableExportCustom} from "../../components/table/TableExportCustom";
import {Notifications} from "../../components/notifications/Notifications";
import axios from "axios";
import {getApiLink} from "../../functions/getApiLink";
import {getBearer} from "../../functions/getBearer";
import { ITimesheet } from '../../models';
import {SetTimesheet} from "../../api/SetTimesheet";
import { useDispatch, useSelector } from 'react-redux';
import {Translate} from "../../components/translate/Translate";

interface ISummaryProps {

}

export const Summary: React.FC<ISummaryProps> = () => {

    const dispatch = useDispatch()

    const timesheet = useSelector((state: any) => state.toolkit.timesheet)

    const dateNow = new Date()
    const [listYear, setListYear] = useState(dateNow.getFullYear())

    useEffect(() => {
        SetTimesheet(dispatch)
    }, [])

    return (
        <SummaryStyled className="summary">
            <div className="summary__header page-header">
                <div className="page-header__col">
                    <h1 className="page-header__title title">
                        <Translate>summary_page.main.summary</Translate>
                    </h1>
                </div>
                <div className="page-header__col">

                    <Notifications/>

                </div>
                <div className="page-header__col">

                    <TableSelectYear setYear={setListYear}/>

                </div>
                <div className="page-header__col">

                    <TableExportCustom title={'export all'}/>

                </div>
            </div>
            <div className="summary__main">

                {
                    timesheet.length ? timesheet.map((item: ITimesheet, index: number) =>
                        <SummaryItem key={item.id} isOpen={index === 0} dataItem={item} />
                    ) : "Таймщитов нету"
                }

            </div>
        </SummaryStyled>
    )
}
