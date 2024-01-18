import React, {useEffect, useState} from 'react'
import {TimesheetTableBody} from "./TimesheetTableBody";
import {TimesheetTableHeader} from "./TimesheetTableHeader";
import {useSelector} from 'react-redux';

interface ITimesheetTableProps {
    rowsSelectValue: any
}

export const TimesheetTable: React.FC<ITimesheetTableProps> = ({rowsSelectValue}) => {

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
