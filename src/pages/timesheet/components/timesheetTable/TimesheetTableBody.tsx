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

    const [allDates, setAllDates] = useState<any>([])

    useEffect(() => {

        console.log(taskList)
        // const uniqueObjects: ITask[] = Object.values(taskList.reduce((acc: any, obj) => {
        //     acc[obj.date] = obj;
        //     return acc;
        // }, {}));

        const summarizedData = taskList.reduce((acc, item) => {
            const date = item.date;
            // @ts-ignore
            const existingItem = acc.find(entry => entry.date === date);

            if (existingItem) {
                // @ts-ignore
                existingItem.hours += item.hours;
            } else {
                // @ts-ignore
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
    // const [arr, setArr]: any = useState([])
    //
    // useEffect(() => {
    //     for(let i = 0; i < allDates.length; i++) {
    //         let allHoursAmount1 = 0
    //
    //         setArr((prev: any) => [...prev, taskList.filter(item => item.date === allDates[i]).map(item => allHoursAmount1 += +item.hours).reverse()[0]])
    //
    //     }
    // }, [taskList])

    return (
        <div className="section-table__body">

            {
                allDates
                    ?.sort((a: any, b: any) => {
                        const c = new Date(`${a.date[3]}${a.date[4]}.${a.date[0]}${a.date[1]}.${a.date[6]}${a.date[7]}`).getTime();
                        const d = new Date(`${b.date[3]}${b.date[4]}.${b.date[0]}${b.date[1]}.${b.date[6]}${b.date[7]}`).getTime();
                        if(sortByDate === "ASC") {
                            return c - d;
                        } else if (sortByDate === "DESC") {
                            return d - c
                        } else {
                            return a
                        }
                    })
                    ?.sort((a: any, b: any) => {
                        const c = a.hours
                        const d = b.hours
                        if(sortByTotal === "ASC") {
                            return c - d;
                        } else if (sortByTotal === "DESC") {
                            return d - c
                        } else {
                            return a
                        }
                    })
                    .map((dateItem: any) => {
                        let allHoursAmount = 0
                        let mobileDateHeight = 0;

                        taskList.filter(item => item.date === dateItem.date).map(item => allHoursAmount += +item.hours)

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
                                        {allHoursAmount} h
                                    </div>
                                </div>
                                <div className="section-table__row-block--list">

                                    {
                                        taskList
                                            ?.filter(item => item.date === dateItem.date)
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
