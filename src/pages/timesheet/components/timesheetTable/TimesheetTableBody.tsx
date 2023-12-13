import React, {useContext, useEffect, useRef, useState} from 'react'
import {ITask} from "../../../../models";
import {PopupContext} from "../../../../App";
import {TimesheetTableItem} from "./TimesheetTableItem";

interface ITimesheetTableBodyProps {
    taskList: ITask[]
    rowsSelectValue: any
    filterByProjectName: string
    filterByProjectDescription: string
    sortByDate: string
    sortByTotal: string
}

export const TimesheetTableBody: React.FC<ITimesheetTableBodyProps> = ({
                                                                           taskList,
                                                                           rowsSelectValue,
                                                                           filterByProjectName,
                                                                           filterByProjectDescription,
                                                                           sortByDate,
                                                                           sortByTotal
                                                                       }) => {

    const [allDates, setAllDates] = useState<string[]>([])

    useEffect(() => {

        const uniqueObjects: ITask[] = Object.values(taskList.reduce((acc: any, obj) => {
            acc[obj.date] = obj;
            return acc;
        }, {}));

        setAllDates(uniqueObjects.map(item => item.date))

    }, [taskList])

    let numberOfRow = 0
    const [arr, setArr]: any = useState([])

    useEffect(() => {
        for(let i = 0; i < allDates.length; i++) {
            let allHoursAmount1 = 0

            setArr((prev: any) => [...prev, taskList.filter(item => item.date === allDates[i]).map(item => allHoursAmount1 += +item.hours).reverse()[0]])

        }
    }, [taskList])

    return (
        <div className="section-table__body">

            {
                allDates
                    ?.sort((a, b) => {
                        const c = new Date(`${a[3]}${a[4]}.${a[0]}${a[1]}.${a[6]}${a[7]}`).getTime();
                        const d = new Date(`${b[3]}${b[4]}.${b[0]}${b[1]}.${b[6]}${b[7]}`).getTime();
                        return sortByDate === "ASC" ? c - d : d - c;
                    })
                    .map(dateItem => {
                        let allHoursAmount = 0
                        let mobileDateHeight = 0;

                        taskList.filter(item => item.date === dateItem).map(item => allHoursAmount += +item.hours)

                        mobileDateHeight = taskList?.filter(item => item.date === dateItem).length * 48.8

                        return (
                            <div key={dateItem} className="section-table__row-block">
                                <div className="section-table__row-block--span-params">
                                    <div className="section-table__param" style={{
                                        height: window.innerWidth < 992 ? `${mobileDateHeight}px` : "",
                                        marginBottom: window.innerWidth < 992 ? `-${mobileDateHeight}px` : ""
                                    }}>
                                        {dateItem.replaceAll(".", "/")}
                                    </div>
                                    <div className={`section-table__param ${allHoursAmount !== 8 && "is-accent"}`}>
                                        {allHoursAmount} h
                                    </div>
                                </div>
                                <div className="section-table__row-block--list">

                                    {
                                        taskList
                                            ?.filter(item => item.date === dateItem)
                                            ?.filter(item => filterByProjectName ? item.project.name === filterByProjectName : item)
                                            ?.filter(item => filterByProjectDescription ? item.project.description === filterByProjectDescription : item)
                                            ?.sort((a, b) => {
                                                return b.hours - a.hours;
                                            })
                                            ?.sort((a, b) => {
                                                const c = +`${a.time[0]}${a.time[1]}`
                                                const d = +`${b.time[0]}${b.time[1]}`
                                                return c - d;
                                            })
                                            ?.map(taskItem => {
                                                numberOfRow += 1

                                                if (rowsSelectValue.value && rowsSelectValue.value < numberOfRow) return "";

                                                return (
                                                    <TimesheetTableItem key={taskItem.id} taskItem={taskItem}
                                                                        numberOfRow={numberOfRow}/>
                                                )
                                            })
                                    }

                                </div>
                            </div>
                        )
                    })
            }

        </div>
    )
}
