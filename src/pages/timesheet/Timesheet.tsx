import React, {createContext, useEffect, useState} from 'react'
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import {TimesheetHeader} from "./components/timesheetHeader/TimesheetHeader";
import {TimesheetTable} from "./components/timesheetTable/TimesheetTable";
import {TimesheetStyled} from "./Timesheet.styled";
import {IEmployee, IStatistic, ITask, ITimesheet} from "../../models";
import {getBearer} from "../../functions/getBearer";
import axios from "axios";
import {getApiLink} from "../../functions/getApiLink";
import {useDispatch, useSelector} from 'react-redux';
import {setTasks} from '../../storage/toolkit';
import {CustomSelect} from "../../components/customSelect/CustomSelect";
import {RowsPerPage} from "../../constants/RowsPerPage";
import {log} from "util";
import {DownSidebar} from "../../components/downSidebar/DownSidebar";

interface ITimesheetProps {

}

export const BlockToEdit: any = createContext(null)

export const Timesheet: React.FC<ITimesheetProps> = () => {

    const dispatch = useDispatch()

    const taskList: ITask[] = useSelector((state: any) => state.toolkit.tasks)
    const chosenTimesheet: ITimesheet = useSelector((state: any) => state.toolkit.chosenTimesheet)
    const timesheetStatistic: IStatistic = useSelector((state: any) => state.toolkit.timesheetStatistic)

    const [rowsSelectValue, setRowsSelectValue] = useState(RowsPerPage()[0])
    const [itemToEdit, setItemToEdit] = useState<ITask>()
    const [isOpenDownSidebar, setIsOpenDownSidebar] = useState(false)

    useEffect(() => {
        if(!chosenTimesheet || !Object.keys(chosenTimesheet)?.length) return;

        getBearer("get")
        axios.get(getApiLink(`/api/timesheet/tasks/?timesheet_id=${chosenTimesheet?.id}`)).then(({data}) => {
            dispatch(setTasks(data))
        })
    }, [chosenTimesheet])

    const handleAddRows = () => {
        const plusCount = window.innerWidth < 768 ? 10 : 20
        setRowsSelectValue({
            value: rowsSelectValue.value + plusCount,
            label: taskList.length === +rowsSelectValue.label + plusCount ? "All" : String(+rowsSelectValue.label + plusCount)
        })
    }

    return (
        <BlockToEdit.Provider value={setItemToEdit}>
            <TimesheetStyled style={{paddingBottom: isOpenDownSidebar ? "270px" : "80px"}} className="section-table">

                <TimesheetHeader itemToEdit={itemToEdit}/>

                <TimesheetTable rowsSelectValue={rowsSelectValue}/>

                <div className="section-table__footer">
                    <div className="section-table__row-per-page visible-on-mob">
                        <span>Rows per page:</span>

                        <CustomSelect list={RowsPerPage()} defaultValue={RowsPerPage()[3]} selectValue={rowsSelectValue}
                                      setSelectedItem={setRowsSelectValue}/>
                    </div>
                    {rowsSelectValue.value !== 0 && taskList.length > rowsSelectValue.value &&
                        <button onClick={handleAddRows} className="section-table__see-more btn" type="button">
                            Show more
                            <svg width="15" height="15" viewBox="0 0 15 15">
                                <use xlinkHref="#arrow-down"></use>
                            </svg>
                        </button>}
                    <div className="section-table__row-per-page visible-on-desktop">
                        <span>Rows per page:</span>

                        <CustomSelect list={RowsPerPage()} defaultValue={RowsPerPage()[3]} selectValue={rowsSelectValue}
                                      setSelectedItem={setRowsSelectValue}/>
                    </div>
                </div>
            </TimesheetStyled>

            <DownSidebar type={"timesheet"} statisticAllAmount={timesheetStatistic.all_hours} statisticAllElements={timesheetStatistic.tasks} setIsOpenDownSidebar={setIsOpenDownSidebar}/>
        </BlockToEdit.Provider>
    )
}
