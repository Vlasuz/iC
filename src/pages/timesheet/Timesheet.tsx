import React, {createContext, useEffect, useState} from 'react'
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import {TimesheetHeader} from "./components/timesheetHeader/TimesheetHeader";
import {TimesheetTable} from "./components/timesheetTable/TimesheetTable";
import {TimesheetStyled} from "./Timesheet.styled";
import {IEmployee, IStatistic, ITask, ITimesheet, IUser} from "../../models";
import {getBearer} from "../../functions/getBearer";
import axios from "axios";
import {getApiLink} from "../../functions/getApiLink";
import {useDispatch, useSelector} from 'react-redux';
import {setTasks, setTimesheetStatistic} from '../../storage/toolkit';
import {CustomSelect} from "../../components/customSelect/CustomSelect";
import {RowsPerPage} from "../../constants/RowsPerPage";
import {DownSidebar} from "../../components/downSidebar/DownSidebar";
import {TimesheetTableItem} from "./components/timesheetTable/TimesheetTableItem";
import {MonthNumber} from "../../constants/MonthNumber";

import logo from "./../../assets/html/img/logo.png"
import {useParams} from "react-router-dom";
import {Translate} from "../../components/translate/Translate";
import {SetStatistic} from "../../api/SetStatistic";
import {SetTimesheet} from "../../api/SetTimesheet";

interface ITimesheetProps {

}

export const BlockToEdit: any = createContext(null)

export const Timesheet: React.FC<ITimesheetProps> = () => {

    const dispatch = useDispatch()

    const {timesheetId}: any = useParams()

    const taskList: ITask[] = useSelector((state: any) => state.toolkit.tasks)
    const chosenTimesheet: ITimesheet = useSelector((state: any) => state.toolkit.chosenTimesheet)
    const timesheetStatistic: IStatistic = useSelector((state: any) => state.toolkit.timesheetStatistic)
    const userData: IUser = useSelector((state: any) => state.toolkit.user)

    const [rowsSelectValue, setRowsSelectValue] = useState(RowsPerPage()[0])
    const [itemToEdit, setItemToEdit] = useState<ITask>()
    const [isOpenDownSidebar, setIsOpenDownSidebar] = useState(false)
    const [statistic, setStatistic] = useState<IStatistic | undefined>()
    const [isLoad, setIsLoad] = useState(false)

    useEffect(() => {
        if (!chosenTimesheet || !Object.keys(chosenTimesheet)?.length) return;

        getBearer("get")
        axios.get(getApiLink(`/api/timesheet/tasks/?timesheet_id=${timesheetId ?? chosenTimesheet?.id}`)).then(({data}) => {
            console.log('api/timesheet/tasks/?timesheet_id', data)
            dispatch(setTasks(data))
        })

        getBearer('get')
        axios.get(getApiLink(`/api/timesheet/statistics/?timesheet_id=${timesheetId ?? chosenTimesheet?.id}`)).then(({data}) => {
            setStatistic(data)
            SetStatistic(dispatch, timesheetId)
        }).catch(er => console.log(getApiLink("/api/timesheet/statistics/?timesheet_id"), er))
    }, [chosenTimesheet, timesheetId])

    useEffect(() => {
        if (isLoad) return;

        setRowsSelectValue(taskList.length > +RowsPerPage()[0].value ? RowsPerPage()[0] : RowsPerPage()[3])
        setTimeout(() => {
            setIsLoad(true)
        }, 1000)
    }, [taskList, isLoad])

    useEffect(() => {
        setStatistic(timesheetStatistic)
    }, [timesheetStatistic])

    const handleAddRows = () => {
        const plusCount = window.innerWidth < 768 ? 10 : 20

        setRowsSelectValue({
            value: taskList.length <= +rowsSelectValue.label + plusCount ? 0 : rowsSelectValue.value + plusCount,
            label: taskList.length <= +rowsSelectValue.label + plusCount ? "All" : String(+rowsSelectValue.label + plusCount)
        })
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

    let numberOfRow = 0

    const styleForOtherText = {
        fontSize: "16px",
    }

    const tdStyle = {
        verticalAlign: "middle",
        fontSize: "10px",
        border: "1px solid rgba(208, 206, 206, 1)",
    }

    return (
        <BlockToEdit.Provider value={setItemToEdit}>
            <TimesheetStyled style={{paddingBottom: isOpenDownSidebar ? "270px" : "80px"}} className="section-table">


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
                        <td style={{textAlign: "center", verticalAlign: "middle", background: "red", color: "#fff", fontSize: "22px", width: "43px"}}>
                            <b>iC</b>
                        </td>
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
                            <b>Name:</b> {userData.first_name} {userData.last_name}</td>
                        <td></td>
                        <td></td>
                        <td style={{textAlign: "right", paddingBottom: "20px", ...styleForOtherText}} colSpan={3}>
                            <b>{`${chosenTimesheet?.date && MonthNumber()[`${chosenTimesheet?.date[3]}${chosenTimesheet?.date[4]}`]}`},
                                20{`${chosenTimesheet?.date && chosenTimesheet?.date[6]}${chosenTimesheet?.date && chosenTimesheet?.date[7]}`}</b>
                        </td>
                    </tr>

                    <tr></tr>

                    <tr>
                        <th style={{...tdStyle, padding: "5px 0",fontSize: "10px" , fontWeight: "400", color: "rgba(117, 113, 113, 1)", width: "25px"}}>No</th>
                        <th style={{...tdStyle, padding: "5px 0",fontSize: "10px" , fontWeight: "400", color: "rgba(117, 113, 113, 1)", width: "65px"}}>Date</th>
                        <th style={{...tdStyle, padding: "5px 0",fontSize: "10px" , fontWeight: "400", color: "rgba(117, 113, 113, 1)", width: "85px"}}>Project Num</th>
                        <th style={{...tdStyle, padding: "5px 0",fontSize: "10px" , fontWeight: "400", color: "rgba(117, 113, 113, 1)", width: "245px"}}>Project description</th>
                        <th style={{...tdStyle, padding: "5px 0",fontSize: "10px" , fontWeight: "400", color: "rgba(117, 113, 113, 1)", width: "210px"}}>Task</th>
                        <th style={{...tdStyle, padding: "5px 0",fontSize: "10px" , fontWeight: "400", color: "rgba(117, 113, 113, 1)", width: "68px"}}>Time</th>
                        <th style={{...tdStyle, padding: "5px 0",fontSize: "10px" , fontWeight: "400", color: "rgba(117, 113, 113, 1)", width: "41px"}}>Hours</th>
                        <th style={{...tdStyle, padding: "5px 0",fontSize: "10px" , fontWeight: "400", color: "rgba(117, 113, 113, 1)", width: "43px"}}>Total</th>
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
                                                        padding: "10px",
                                                        ...tdStyle
                                                    }}>{taskItem.project.description}</td>
                                                    <td style={{
                                                        textAlign: "left",
                                                        padding: "10px",
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
                                                    }}>{taskItem.hours} h</td>
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
                            <b>Total: {timesheetStatistic.all_hours} hours</b></td>
                    </tr>
                    </tbody>

                </table>


                <TimesheetHeader itemToEdit={itemToEdit}/>

                <TimesheetTable rowsSelectValue={rowsSelectValue}/>

                <div className="section-table__footer">
                    <div className="section-table__row-per-page visible-on-mob">
                        <span>
                            <Translate>timesheet_page.table.rows_per_page</Translate>
                        </span>

                        <CustomSelect list={RowsPerPage()} defaultValue={RowsPerPage()[3]} selectValue={rowsSelectValue}
                                      setSelectedItem={setRowsSelectValue}/>
                    </div>
                    {rowsSelectValue.value !== 0 && taskList.length > rowsSelectValue.value &&
                        <button onClick={handleAddRows} className="section-table__see-more btn" type="button">
                            <Translate>timesheet_page.table.show_more</Translate>
                            <svg width="15" height="15" viewBox="0 0 15 15">
                                <use xlinkHref="#arrow-down"></use>
                            </svg>
                        </button>}
                    <div className="section-table__row-per-page visible-on-desktop">
                        <span>
                            <Translate>timesheet_page.table.rows_per_page</Translate>
                        </span>

                        <CustomSelect list={RowsPerPage()} defaultValue={RowsPerPage()[3]} selectValue={rowsSelectValue}
                                      setSelectedItem={setRowsSelectValue}/>
                    </div>
                </div>
            </TimesheetStyled>

            <DownSidebar type={"timesheet"} statisticAllAmount={statistic?.all_hours ?? timesheetStatistic.all_hours}
                         statisticAllElements={statistic?.tasks ?? timesheetStatistic.tasks}
                         setIsOpenDownSidebar={setIsOpenDownSidebar}/>
        </BlockToEdit.Provider>
    )
}
