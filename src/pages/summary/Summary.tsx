import React, {useEffect, useState} from 'react'
import { NavLink } from 'react-router-dom';
import {SummaryStyled} from "./Summary.styled";
import {SummaryItem} from "./components/SummaryItem";
import {TableSelectYear} from "../../components/table/TableSelectYear";
import {TableExport} from "../../components/table/TableExport";
import {Notifications} from "../../components/notifications/Notifications";
import axios from "axios";
import {getApiLink} from "../../functions/getApiLink";
import {getBearer} from "../../functions/getBearer";
import { ITimesheet } from '../../models';

interface ISummaryProps {

}

export const Summary: React.FC<ISummaryProps> = () => {

    const [timesheet, setTimesheet] = useState([])

    useEffect(() => {
        getBearer("get")
        axios.get(getApiLink("/api/timesheet/my/")).then(({data}) => {
            console.log(data)
            setTimesheet(data)
        })
    }, [])

    return (
        <SummaryStyled className="summary">
            <div className="summary__header page-header">
                <div className="page-header__col">
                    <h1 className="page-header__title title">
                        Summary
                    </h1>
                </div>
                <div className="page-header__col">

                    <Notifications/>

                </div>
                <div className="page-header__col">

                    <TableSelectYear/>

                </div>
                <div className="page-header__col">

                    <TableExport title={"Export All"}/>

                </div>
            </div>
            <div className="summary__main">

                {
                    timesheet.map((item: ITimesheet) =>
                        <SummaryItem key={item.id} dataItem={item} />
                    )
                }

            </div>
        </SummaryStyled>
    )
}
