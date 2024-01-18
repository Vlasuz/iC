import React, {createContext, useEffect, useState} from 'react'

import "react-datepicker/dist/react-datepicker.css";
import {TimesheetHeader} from "./components/timesheetHeader/TimesheetHeader";
import {TimesheetTable} from "./components/timesheetTable/TimesheetTable";
import {TimesheetStyled} from "./Timesheet.styled";
import {IComment, IStatistic, ITask, ITimesheet} from "../../models";
import {getBearer} from "../../functions/getBearer";
import axios from "axios";
import {getApiLink} from "../../functions/getApiLink";
import {useDispatch, useSelector} from 'react-redux';
import {setTasks} from '../../storage/toolkit';
import {CustomSelect} from "../../components/customSelect/CustomSelect";
import {RowsPerPage} from "../../constants/RowsPerPage";
import {DownSidebar} from "../../components/downSidebar/DownSidebar";

import {useParams} from "react-router-dom";
import {Translate} from "../../components/translate/Translate";
import {SetStatistic} from "../../api/SetStatistic";
import {TimesheetExportTable} from "./components/TimesheetExportTable";

interface ITimesheetProps {

}

export const BlockToEdit: any = createContext(null)
export const FixedTopEdit: any = createContext(null)
export const AmountStatistic: any = createContext(null)

export const Timesheet: React.FC<ITimesheetProps> = () => {

    const dispatch = useDispatch()

    const {timesheetId}: any = useParams()

    const taskList: ITask[] = useSelector((state: any) => state.toolkit.tasks)
    const chosenTimesheet: ITimesheet = useSelector((state: any) => state.toolkit.chosenTimesheet)
    const timesheetStatistic: IStatistic = useSelector((state: any) => state.toolkit.timesheetStatistic)

    const [rowsSelectValue, setRowsSelectValue] = useState(RowsPerPage()[0])
    const [itemToEdit, setItemToEdit] = useState<ITask>()
    const [isOpenDownSidebar, setIsOpenDownSidebar] = useState(false)
    const [statistic, setStatistic] = useState<IStatistic | undefined>()
    const [isLoad, setIsLoad] = useState(false)

    useEffect(() => {
        if (!chosenTimesheet || !Object.keys(chosenTimesheet)?.length) return;

        getBearer("get")
        axios.get(getApiLink(`/api/timesheet/tasks/?timesheet_id=${timesheetId ?? chosenTimesheet?.id}`)).then(({data}) => {
            dispatch(setTasks(data))
        })

        getBearer('get')
        axios.get(getApiLink(`/api/timesheet/statistics/?timesheet_id=${timesheetId ?? chosenTimesheet?.id}`)).then(({data}) => {
            setStatistic(data)
            SetStatistic(dispatch, timesheetId ?? chosenTimesheet?.id)
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


    const [comments, setComments] = useState<IComment[]>([])

    useEffect(() => {
        setComments(chosenTimesheet?.comments)
    }, [chosenTimesheet])

    const [isFixedEditBlock, setIsFixedEditBlock] = useState(false)
    const [amountStatistic, setAmountStatistic] = useState(0)

    return (
        <AmountStatistic.Provider value={setAmountStatistic}>
            <FixedTopEdit.Provider value={setIsFixedEditBlock}>
                <BlockToEdit.Provider value={setItemToEdit}>
                    <TimesheetStyled style={{paddingBottom: isOpenDownSidebar ? "270px" : "80px"}}
                                     className="section-table">

                        <TimesheetExportTable/>

                        <TimesheetHeader isFixedEditBlock={isFixedEditBlock} itemToEdit={itemToEdit}/>

                        <TimesheetTable rowsSelectValue={rowsSelectValue}/>

                        <div className="section-table__footer">
                            <div className="section-table__row-per-page visible-on-mob">
                        <span>
                            <Translate>timesheet_page.table.rows_per_page</Translate>
                        </span>

                                <CustomSelect list={RowsPerPage()} defaultValue={RowsPerPage()[3]}
                                              selectValue={rowsSelectValue}
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

                                <CustomSelect list={RowsPerPage()} defaultValue={RowsPerPage()[3]}
                                              selectValue={rowsSelectValue}
                                              setSelectedItem={setRowsSelectValue}/>
                            </div>
                        </div>
                    </TimesheetStyled>

                    <DownSidebar comments={comments}
                                 amountStatistic={amountStatistic}
                                 setComments={setComments}
                                 type={"timesheet"}
                                 statisticAllAmount={statistic?.all_hours ?? timesheetStatistic.all_hours}
                                 statisticAllElements={statistic?.tasks ?? timesheetStatistic.tasks}
                                 setIsOpenDownSidebar={setIsOpenDownSidebar}/>
                </BlockToEdit.Provider>
            </FixedTopEdit.Provider>
        </AmountStatistic.Provider>
    )
}
