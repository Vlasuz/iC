import React, {useContext, useEffect, useRef, useState} from 'react'
import {ITask, ITimesheet} from "../../../../models";
import {PopupContext} from "../../../../App";
import {TimesheetTableItem} from "./TimesheetTableItem";
import {MonthNumber} from "../../../../constants/MonthNumber";
import { useSelector } from 'react-redux';
import {Translate} from "../../../../components/translate/Translate";

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

    const [allDates, setAllDates] = useState<any>([])

    const chosenTimesheet: ITimesheet = useSelector((state: any) => state.toolkit.chosenTimesheet)

    useEffect(() => {
        if(!taskList.length) return;

        const summarizedData = taskList?.reduce((acc: any, item) => {
            const date = item.date;

            const existingItem: any = acc.find((entry: any) => entry.date === date);

            if (existingItem) {
                existingItem.hours += item.hours;
            } else {
                acc.push({ ...item });
            }

            return acc;
        }, []);


        setAllDates(summarizedData.map((item: any) => {
            return {
                date: item.date,
                hours: item.hours
            }
        }))

    }, [taskList])

    let numberOfRow = 0

    return (
        <div className="section-table__body">

            {
                allDates
                    ?.sort((a: any, b: any) => {
                        const c = new Date(`${a.date[3]}${a.date[4]}.${a.date[0]}${a.date[1]}.${a.date[6]}${a.date[7]}`).getTime();
                        const d = new Date(`${b.date[3]}${b.date[4]}.${b.date[0]}${b.date[1]}.${b.date[6]}${b.date[7]}`).getTime();
                        if(sortByDate === "ASC") {
                            return d - c
                        } else if (sortByDate === "DESC") {
                            return c - d;
                        } else {
                            return a
                        }
                    })
                    ?.filter((item: any) => {
                        if(sortByTotal === "ASC") {
                            return item.hours >= 8
                        } else if (sortByTotal === "DESC") {
                            return item.hours < 8
                        } else {
                            return item
                        }
                    })
                    .map((dateItem: any) => {
                        let allHoursAmount = 0
                        let mobileDateHeight = 0;

                        taskList?.filter(item => item.date === dateItem.date)?.map(item => allHoursAmount += +item.hours)

                        mobileDateHeight = taskList?.filter(item => item.date === dateItem.date).length * 48.8

                        return (
                            <div key={dateItem.date} className="section-table__row-block">
                                <div className="section-table__row-block--span-params">
                                    <div className="section-table__param" style={{
                                        height: window.innerWidth < 992 ? `${mobileDateHeight}px` : "",
                                        marginBottom: window.innerWidth < 992 ? `-${mobileDateHeight}px` : ""
                                    }}>
                                        {dateItem.date.substring(3, 5)}/{dateItem.date.substring(0, 2)}/{dateItem.date.substring(6)}
                                    </div>
                                    <div className={`section-table__param ${allHoursAmount !== 8 && "is-accent"}`}>
                                        {allHoursAmount} <Translate>timesheet_page.table.h</Translate>
                                    </div>
                                </div>
                                <div className="section-table__row-block--list">

                                    {
                                        taskList
                                            ?.filter(item => item.date === dateItem.date)
                                            ?.filter(item => filterByProjectName ? item.project.name === filterByProjectName : item)
                                            ?.filter(item => filterByProjectDescription ? item.project.description === filterByProjectDescription : item)
                                            // ?.filter(item => chosenTimesheet?.date && MonthNumber()[+`${item?.date[3]}${item?.date[4]}`] === MonthNumber()[+`${chosenTimesheet.date[3]}${chosenTimesheet.date[4]}`])
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

                                                if (rowsSelectValue?.value && rowsSelectValue?.value < numberOfRow) return "";

                                                return (
                                                    <TimesheetTableItem key={taskItem?.id} taskItem={taskItem}
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
