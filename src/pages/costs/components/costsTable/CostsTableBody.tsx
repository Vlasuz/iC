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
                    .sort((a, b) => {
                        // Пример: "21.01.16 20:07:55"
                        const aDate: any = new Date(`20${a.date} ${a.created_at.slice(9).replaceAll("/", ".")}`);
                        const bDate: any = new Date(`20${b.date} ${b.created_at.slice(9).replaceAll("/", ".")}`);

                        // Проверка на корректность дат
                        if (isNaN(aDate.getTime()) || isNaN(bDate.getTime())) {
                            // Обработка случая, когда даты некорректны
                            return 0;
                        }

                        return sortByDate !== "" ? (sortByDate === "DESC" ? aDate - bDate : bDate - aDate) : 0;
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
