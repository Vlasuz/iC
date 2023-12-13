import React, {useEffect, useState} from 'react'
import {IExpense, ITask} from "../../../../models";
import {CostsTableItem} from "./CostsTableItem";

interface ICostsTableBodyProps {
    list: IExpense[]
    filterByProjectName: string
    filterByProjectDescription: string
    sortByDate: string
    sortByCost: string
}

export const CostsTableBody: React.FC<ICostsTableBodyProps> = ({list, filterByProjectName, filterByProjectDescription, sortByDate, sortByCost}) => {

    return (
        <div className="section-table__body">

            {
                list
                    ?.filter(item => filterByProjectName ? item.project.name === filterByProjectName : item)
                    ?.filter(item => filterByProjectDescription ? item.project.description === filterByProjectDescription : item)
                    ?.sort((a, b) => {
                        const c = new Date(`${a.date[3]}${a.date[4]}.${a.date[0]}${a.date[1]}.${a.date[6]}${a.date[7]}`).getTime();
                        const d = new Date(`${b.date[3]}${b.date[4]}.${b.date[0]}${b.date[1]}.${b.date[6]}${b.date[7]}`).getTime();
                        return sortByDate !== "" ? sortByDate === "ASC" ? c - d : d - c : c;
                    })
                    ?.sort((a, b) => {
                        const c = +a.sum;
                        const d = +b.sum;
                        return sortByCost !== "" ? sortByCost === "ASC" ? c - d : d - c : c;
                    })
                    ?.map((item, index) => <CostsTableItem key={item.id} item={item} index={index} />)
            }

        </div>
    )
}
