import React, {useEffect, useState} from 'react'
import {CostsTableHeader} from "./CostsTableHeader";
import {CostsTableBody} from "./CostsTableBody";
import {useSelector} from "react-redux";

interface ICostsTableProps {
    rowsSelectValue: any
}

export const CostsTable: React.FC<ICostsTableProps> = ({rowsSelectValue}) => {

    const expenseList = useSelector((state: any) => state.toolkit.expenses)

    const [filterByProjectName, setFilterByProjectName] = useState("")
    const [filterByProjectDescription, setFilterByProjectDescription] = useState("")
    const [sortByDate, setSortByDate] = useState("ASC")
    const [sortByCost, setSortByCost] = useState("")

    return (
        <div className="section-table__main table-costs add-border">
            <div className="section-table__main--container" data-simplebar data-simplebar-auto-hide="false">
                <div className="section-table__main--wrapper">

                    <CostsTableHeader
                        setFilterByProjectName={setFilterByProjectName}
                        setFilterByProjectDescription={setFilterByProjectDescription}
                        setSortByDate={setSortByDate}
                        setSortByCost={setSortByCost}
                    />

                    <CostsTableBody
                        list={expenseList}
                        rowsSelectValue={rowsSelectValue}
                        filterByProjectName={filterByProjectName}
                        filterByProjectDescription={filterByProjectDescription}
                        sortByDate={sortByDate}
                        sortByCost={sortByCost}
                    />

                </div>
            </div>
        </div>
    )
}
