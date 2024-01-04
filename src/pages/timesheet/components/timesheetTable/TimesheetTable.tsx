import React, {useEffect, useState} from 'react'
import {TimesheetTableBody} from "./TimesheetTableBody";
import axios from "axios";
import {getApiLink} from "../../../../functions/getApiLink";
import {getBearer} from "../../../../functions/getBearer";
import {ITask} from "../../../../models";
import SimpleBar from "simplebar-react";
import {TimesheetTableHeader} from "./TimesheetTableHeader";
import {useSelector} from 'react-redux';

interface ITimesheetTableProps {
    rowsSelectValue: any
}

export const TimesheetTable: React.FC<ITimesheetTableProps> = ({rowsSelectValue}) => {

    const taskList = useSelector((state: any) => state.toolkit.tasks)

    const [filterByProjectName, setFilterByProjectName] = useState("")
    const [filterByProjectDescription, setFilterByProjectDescription] = useState("")
    const [sortByDate, setSortByDate] = useState("ASC")
    const [sortByTotal, setSortByTotal] = useState("")

    return (
        <div className="section-table__main table-timesheet">
            {/*<SimpleBar autoHide={false} className="section-table__main--container">*/}
                <div className="section-table__main--container">
                    <div className="section-table__main--wrapper">
                        <TimesheetTableHeader
                            setFilterByProjectName={setFilterByProjectName}
                            setFilterByProjectDescription={setFilterByProjectDescription}
                            setSortByDate={setSortByDate}
                            setSortByTotal={setSortByTotal}
                        />
                        <TimesheetTableBody
                            rowsSelectValue={rowsSelectValue}
                            taskList={taskList}
                            filterByProjectName={filterByProjectName}
                            filterByProjectDescription={filterByProjectDescription}
                            sortByDate={sortByDate}
                            sortByTotal={sortByTotal}
                        />
                    </div>
                </div>
            {/*</SimpleBar>*/}

        </div>
    )
}
