import React, {useContext, useEffect, useState} from 'react'
import {IExpense, ITask, ITimesheet} from "../../../../models";
import { AmountStatistic } from '../../Costs';
import {CostsTableItem} from "./CostsTableItem";

interface ICostsTableBodyProps {
    list: IExpense[]
    filterByProjectName: string
    filterByProjectDescription: string
    sortByDate: string
    sortByCost: string
    rowsSelectValue: any
    itemToEdit: any
}

export const CostsTableBody: React.FC<ICostsTableBodyProps> = ({
                                                                   list,
                                                                   filterByProjectName,
                                                                   filterByProjectDescription,
                                                                   sortByDate,
                                                                   sortByCost,
                                                                   rowsSelectValue,
                                                                   itemToEdit
                                                               }) => {

    let numberOfRow = 0

    const setAmountStatistic: any = useContext(AmountStatistic)

    useEffect(() => {
        let finalAmountHours = 0;

        const newList = list
            ?.filter(item => filterByProjectName ? item.project.name === filterByProjectName : item)
            ?.filter(item => filterByProjectDescription ? item.project.description === filterByProjectDescription : item)
            ?.reduce((sum: number, cur: any) => {
                return sum + cur.sum;
            }, finalAmountHours);

        setAmountStatistic(newList)
    }, [list, filterByProjectName, filterByProjectDescription]);

    return (
        <div className="section-table__body">

            {
                !!list.length && list
                    ?.filter(item => filterByProjectName ? item.project.name === filterByProjectName : item)
                    ?.filter(item => filterByProjectDescription ? item.project.description === filterByProjectDescription : item)
                    // ?.filter(item => chosenTimesheet?.date && MonthNumber()[`${item?.date[3]}${item?.date[4]}`] === MonthNumber()[`${chosenTimesheet.date[3]}${chosenTimesheet.date[4]}`])
                    ?.sort((a, b) => {
                        const c = new Date(`${a.created_at[3]}${a.created_at[4]}.${a.created_at[0]}${a.created_at[1]}.${a.created_at[6]}${a.created_at[7]}`).getTime();
                        const d = new Date(`${b.created_at[3]}${b.created_at[4]}.${b.created_at[0]}${b.created_at[1]}.${b.created_at[6]}${b.created_at[7]}`).getTime();
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

                        return <CostsTableItem key={item.id} itemToEdit={itemToEdit} item={item} index={index}/>
                    })
            }

        </div>
    )
}
