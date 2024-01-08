import React, {useEffect, useState} from 'react'
import {IExpense, ITask, ITimesheet} from "../../../../models";
import {CostsTableItem} from "./CostsTableItem";
import {useSelector} from "react-redux";

interface ICostsTableBodyProps {
    list: IExpense[]
    filterByProjectName: string
    filterByProjectDescription: string
    sortByDate: string
    sortByCost: string
    rowsSelectValue: any
}

export const CostsTableBody: React.FC<ICostsTableBodyProps> = ({list, filterByProjectName, filterByProjectDescription, sortByDate, sortByCost, rowsSelectValue}) => {

    let numberOfRow = 0

    const chosenTimesheet: ITimesheet = useSelector((state: any) => state.toolkit.chosenTimesheet)

    return (
        <div className="section-table__body">

            {
                !!list.length && list
                    ?.filter(item => filterByProjectName ? item.project.name === filterByProjectName : item)
                    ?.filter(item => filterByProjectDescription ? item.project.description === filterByProjectDescription : item)
                    // ?.filter(item => chosenTimesheet?.date && MonthNumber()[`${item?.date[3]}${item?.date[4]}`] === MonthNumber()[`${chosenTimesheet.date[3]}${chosenTimesheet.date[4]}`])
                    ?.sort((a, b) => {
                        const c = new Date(`${a.date[3]}${a.date[4]}.${a.date[0]}${a.date[1]}.${a.date[6]}${a.date[7]}`).getTime();
                        const d = new Date(`${b.date[3]}${b.date[4]}.${b.date[0]}${b.date[1]}.${b.date[6]}${b.date[7]}`).getTime();
                        return sortByDate !== "" ? sortByDate === "ASC" ? d - c : c - d : c;
                    })
                    ?.sort((a, b) => {
                        const c = +a.sum;
                        const d = +b.sum;
                        return sortByCost !== "" ? sortByCost === "ASC" ? c - d : d - c : c;
                    })
                    ?.map((item, index) => {
                        numberOfRow += 1

                        if (rowsSelectValue?.value && rowsSelectValue?.value < numberOfRow) return "";

                        return <CostsTableItem key={item.id} item={item} index={index}/>
                    })
            }

        </div>
    )
}
