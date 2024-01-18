import React, {useEffect, useState} from 'react'
import {MonthNumber} from "../../../constants/MonthNumber";
import {IStatistic, ITask, ITimesheet, IUser} from "../../../models";
import {useSelector} from "react-redux";

interface ISummaryExportTableTimesheetProps {
    user?: any
}

export const SummaryExportTableTimesheet: React.FC<ISummaryExportTableTimesheetProps> = ({user}) => {

    const taskList: ITask[] = useSelector((state: any) => state.toolkit.tasks)
    const chosenTimesheet: ITimesheet = useSelector((state: any) => state.toolkit.chosenTimesheet)
    const timesheetStatistic: IStatistic = useSelector((state: any) => state.toolkit.timesheetStatistic)
    const userData: IUser = useSelector((state: any) => state.toolkit.user)

    console.log(taskList)

    let numberOfRow = 0

    const styleForOtherText = {
        fontSize: "16px",
    }

    const tdStyle = {
        verticalAlign: "middle",
        fontSize: "10px",
        border: "1px solid rgba(208, 206, 206, 1)",
    }

    const [allDates, setAllDates] = useState<any>([])

    useEffect(() => {
        if (!taskList.length) return;

        const summarizedData = taskList.reduce((acc: any, item) => {
            const date = item.date;

            // Проверяем, есть ли уже такая дата в объекте для подсчета количества
            if (acc[date]) {
                acc[date].count += 1; // Увеличиваем счетчик, если дата уже встречается
                acc[date].hours += item.hours; // Также добавляем часы к этой дате
            } else {
                acc[date] = {count: 1, hours: item.hours}; // Иначе создаем новую запись для этой даты
            }

            return acc;
        }, {});

        // Преобразовываем объект обратно в массив
        const summarizedArray = Object.keys(summarizedData).map(date => ({
            date,
            count: summarizedData[date].count,
            hours: summarizedData[date].hours
        }));

        setAllDates(summarizedArray);
    }, [taskList]);

    return (
        <table
            border={2}
            style={{
                borderCollapse: 'collapse',
                backgroundColor: '#fff',
                fontFamily: 'Calibri',
                width: '100%',
            }}
            id="my-table"
            className="table-to-download-excel"
        >

            <tbody>
            <tr>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td style={{fontSize: "18px", color: "red", height: "30px", textAlign: "right", verticalAlign: "top"}}>
                    <b>iC</b>
                </td>
                {/*<td style={{height: "30px"}}>*/}
                {/*    <img width={30} height={30} src="https://ic.timesheet.space/static/media/logo.7e472f052ce8ccb0ca47.webp" alt=""/>*/}
                {/*</td>*/}
            </tr>

            <tr>
                <td colSpan={8} style={{textAlign: "center", fontSize: "24px"}}>
                    <b>Timesheet (Presence Report)</b>
                </td>
            </tr>

            <tr>
                <td style={{height: "40px"}}></td>
            </tr>

            <tr>
                <td style={{paddingBottom: "20px", ...styleForOtherText}} colSpan={3}>
                    <b>Name:</b> {user?.first_name ?? userData.first_name} {user?.last_name ?? userData.last_name}</td>
                <td></td>
                <td></td>
                <td style={{textAlign: "right", paddingBottom: "20px", ...styleForOtherText}} colSpan={3}>
                    <b>{chosenTimesheet?.date && MonthNumber()[+`${chosenTimesheet?.date[3]}${chosenTimesheet?.date[4]}`].translate},
                        20{`${chosenTimesheet?.date && chosenTimesheet?.date[6]}${chosenTimesheet?.date && chosenTimesheet?.date[7]}`}</b>
                </td>
            </tr>

            <tr></tr>

            <tr>
                <th style={{
                    ...tdStyle,
                    padding: "1px 0",
                    fontSize: "10px",
                    fontWeight: "400",
                    color: "rgba(117, 113, 113, 1)",
                    width: "25px"
                }}>No
                </th>
                <th style={{
                    ...tdStyle,
                    padding: "1px 0",
                    fontSize: "10px",
                    fontWeight: "400",
                    color: "rgba(117, 113, 113, 1)",
                    width: "65px"
                }}>Date
                </th>
                <th style={{
                    ...tdStyle,
                    padding: "1px 0",
                    fontSize: "10px",
                    fontWeight: "400",
                    color: "rgba(117, 113, 113, 1)",
                    width: "85px"
                }}>Project Num
                </th>
                <th style={{
                    ...tdStyle,
                    padding: "1px 0",
                    fontSize: "10px",
                    fontWeight: "400",
                    color: "rgba(117, 113, 113, 1)",
                    width: "245px"
                }}>Project description
                </th>
                <th style={{
                    ...tdStyle,
                    padding: "1px 0",
                    fontSize: "10px",
                    fontWeight: "400",
                    color: "rgba(117, 113, 113, 1)",
                    width: "210px"
                }}>Task
                </th>
                <th style={{
                    ...tdStyle,
                    padding: "1px 0",
                    fontSize: "10px",
                    fontWeight: "400",
                    color: "rgba(117, 113, 113, 1)",
                    width: "68px"
                }}>Time
                </th>
                <th style={{
                    ...tdStyle,
                    padding: "1px 0",
                    fontSize: "10px",
                    fontWeight: "400",
                    color: "rgba(117, 113, 113, 1)",
                    width: "41px"
                }}>Hours
                </th>
                <th style={{
                    ...tdStyle,
                    padding: "1px 0",
                    fontSize: "10px",
                    fontWeight: "400",
                    color: "rgba(117, 113, 113, 1)",
                    width: "43px"
                }}>Total
                </th>
            </tr>


            {
                !!allDates.length && allDates
                    ?.map((dateItem: any) => {
                        let allHoursAmount = 0
                        let countAmount = dateItem.count + 1;

                        !!taskList.length && taskList?.filter(item => item?.date === dateItem?.date)?.map(item => allHoursAmount += +item.hours)

                        return (
                            !!taskList.length && taskList
                                ?.filter(item => item.date === dateItem.date)
                                ?.map((taskItem: ITask, index: number) => {
                                    numberOfRow += 1
                                    countAmount -= 1

                                    return (
                                        <tr key={index}>
                                            <td style={{
                                                textAlign: "center",
                                                ...tdStyle
                                            }}>{numberOfRow}</td>
                                            {dateItem.count === countAmount && <td style={{
                                                textAlign: "center",
                                                // verticalAlign: "middle",
                                                ...tdStyle
                                            }} rowSpan={dateItem.count === countAmount && dateItem.count}>
                                                {dateItem.date.substring(3, 5)}/{dateItem.date.substring(0, 2)}/{dateItem.date.substring(6)}
                                            </td>}
                                            <td style={{
                                                textAlign: "center",
                                                ...tdStyle
                                            }}>{taskItem.project.name}</td>
                                            <td style={{
                                                textAlign: "left",
                                                width: "245px",
                                                padding: "2px 10px",
                                                ...tdStyle
                                            }}>{taskItem.project.description}</td>
                                            <td style={{
                                                textAlign: "left",
                                                padding: "2px 10px",
                                                ...tdStyle
                                            }}>{taskItem.task}</td>
                                            <td style={{
                                                textAlign: "center",
                                                width: "75px",
                                                ...tdStyle
                                            }}>{taskItem.time.replace("–", "to")}</td>
                                            <td style={{
                                                textAlign: "center",
                                                ...tdStyle
                                            }}>{taskItem.hours} h
                                            </td>
                                            {dateItem.count === countAmount && <td style={{
                                                textAlign: "center",
                                                // verticalAlign: "middle",
                                                ...tdStyle
                                            }} rowSpan={dateItem.count === countAmount && dateItem.count}>
                                                {allHoursAmount} h
                                            </td>}
                                        </tr>
                                    )
                                })
                        )
                    })
            }


            <tr></tr>

            <tr>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td style={{textAlign: "right", paddingTop: "20px", ...styleForOtherText}} colSpan={4}>
                    <b>Total: {timesheetStatistic?.all_hours} hours</b></td>
            </tr>

            {chosenTimesheet?.status === "approve" && <>
                <tr></tr>

                <tr>
                    <td style={{textAlign: "left", paddingTop: "20px", ...styleForOtherText}} colSpan={4}>
                        <b>Approval: </b> {chosenTimesheet.manager.first_name} {chosenTimesheet.manager.last_name}
                    </td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
                <tr>
                    <td style={{textAlign: "left", ...styleForOtherText}} colSpan={4}>
                        <b>Date: </b>
                        {chosenTimesheet.updated_at[3]}{chosenTimesheet.updated_at[4]}/{chosenTimesheet.updated_at[0]}{chosenTimesheet.updated_at[1]}/{chosenTimesheet.updated_at[6]}{chosenTimesheet.updated_at[7]}
                    </td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
            </>}

            </tbody>

        </table>
    )
}
