import React, {createContext, useContext, useEffect, useState} from 'react'
import {useDispatch, useSelector } from 'react-redux';
import {IProject, ITask, ITimesheet, IUser} from "../../../../models";
import {useClickOutside} from "../../../../hooks/ClickOutside";
import {TimesheetHeaderChooseTime} from "./TimesheetHeaderChooseTime";
import {TimesheetHeaderProjects} from "./TimesheetHeaderProjects";
import {TimesheetHeaderDate} from "./TimesheetHeaderDate";
import {TimesheetHeaderTask} from "./TimesheetHeaderTask";
import axios from "axios";
import {getApiLink} from "../../../../functions/getApiLink";
import {getBearer} from "../../../../functions/getBearer";
import {Notifications} from "../../../../components/notifications/Notifications";
import {addTask, editTask, setExpenses, setTasks} from "../../../../storage/toolkit";
import {TimesheetHeaderYearSort} from "./TimesheetHeaderYearSort";
import {TimesheetHeaderExport} from "./TimesheetHeaderExport";
import {BlockToEdit} from "../../Timesheet";
import {TableExport} from "../../../../components/table/TableExport";
import {TableSelectYearMonth} from "../../../../components/table/TableSelectYearMonth";
import { TableProjectsForUser } from '../../../../components/table/TableProjectsForUser';
import {TableCalendar} from "../../../../components/table/TableCalendar";

interface ITimesheetHeaderProps {
    itemToEdit: ITask | undefined
}

export const TimesheetHeader: React.FC<ITimesheetHeaderProps> = ({itemToEdit}) => {

    const isEditTask = itemToEdit && Object.keys(itemToEdit).length

    const timesheet: ITimesheet[] = useSelector((state: any) => state.toolkit.timesheet)

    const [projectData, setProjectData] = useState<IProject | undefined>()
    const [taskData, setTaskData] = useState<string>("")
    const [dateData, setDateData] = useState<string>("")
    const [timeData, setTimeData] = useState<string>("")
    const [hoursData, setHoursData] = useState<number>(0)
    const [searchValueLocal, setSearchValueLocal] = useState("")

    const dispatch = useDispatch()

    const handleCreateTask = () => {
        const timesheetRequest: any = {
            "project_id": projectData?.id,
            "task": taskData,
            "date": dateData,
            "time": timeData,
            "hours": hoursData
        }

        if(isEditTask) {
            delete timesheetRequest.project_id;

            getBearer("patch")
            axios.patch(getApiLink("/api/task/edit/?task_id=" + itemToEdit.id), timesheetRequest).then(({data}) => {
                data.id = itemToEdit.id;
                console.log(data)
                dispatch(editTask(data))
                setIsOpenCreatBlock(false)
            })
        } else {
            getBearer("post")
            axios.post(getApiLink("/api/task/add/"), timesheetRequest).then(({data}) => {
                dispatch(addTask(data))
                setIsOpenCreatBlock(false)
            })
        }
    }

    const lessThenTen = (num: string) =>  +num < 10 ? "0" + num : num

    useEffect(() => {
        if(isEditTask) setIsOpenCreatBlock(true)

        document.querySelector(".simplebar-content-wrapper")?.scrollTo({
            top: 0,
            behavior: 'smooth'
        });

        const date = new Date()

        setProjectData(itemToEdit?.project ?? undefined)
        setTaskData(itemToEdit?.task ?? "")
        setDateData(itemToEdit?.date ?? `${lessThenTen(String(date.getDate()))}.${lessThenTen(String(date.getMonth() + 1))}.${date.getFullYear()}`)
        setTimeData(itemToEdit?.time ?? "")
        setHoursData(itemToEdit?.hours ?? 0)
    }, [itemToEdit])

    const [isOpenCreatBlock, setIsOpenCreatBlock] = useState(false)

    const handleSearchTimesheet = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        getBearer("get")
        axios.get(getApiLink(`/api/timesheet/my/tasks/?search=${searchValueLocal}`)).then(({data}) => {
            dispatch(setTasks(data))
        })
    }

    const setItemEdit: any = useContext(BlockToEdit)

    const handleBackFromCreate = () => {
        setIsOpenCreatBlock(false)
        setItemEdit({})
    }


    const handleSwitchMonth = (month: number) => {
        if(!timesheet.length) return;

        const idTasksForMonth = timesheet.filter(item => Number(`${item.date[3]}${item.date[4]}`) === month)[0]?.id

        if(!idTasksForMonth?.length) return;

        getBearer("get")
        axios.get(getApiLink(`/api/timesheet/my/tasks/?timesheet_id=${idTasksForMonth}`)).then(({data}) => {
            dispatch(setTasks(data))
        })
    }

    function getMondayDate() {
        const today = new Date();
        const dayOfWeek = today.getDay();
        const difference = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
        const monday = new Date(today);
        monday.setDate(today.getDate() + difference);

        return monday;
    }

    const handleOpenToCreate = () => {
        setIsOpenCreatBlock(true)

        setProjectData(undefined)
        setTaskData("")
        setDateData(`${lessThenTen(String(getMondayDate().getDate()))}.${lessThenTen(String(getMondayDate().getMonth() + 1))}.${getMondayDate().getFullYear()}`)
        setTimeData("")
        setHoursData(0)
    }

    return (
        <div className="section-table__header">
            <div className="section-table__header--row is-always-row">
                <div className="section-table__header--col">
                    <h1 className="section-table__title title change-title" id="main-title">
                        <span>
                            {isOpenCreatBlock ? `Timesheet / ${isEditTask ? "Edit task" : "Add task"}` : "Timesheet"}
                        </span>
                    </h1>
                </div>

                <Notifications/>

            </div>
            <div className={isOpenCreatBlock ? "section-table__header--block block-for-is-active is-active" : "section-table__header--block block-for-is-active"}>
                <div className="section-table__header--block-item">
                    <div>
                        <div className="section-table__header--row row-2">
                            <div className="section-table__header--col">
                                <button onClick={handleOpenToCreate} type="button" className="section-table__add btn add-is-active"
                                        data-add-active-change-title="main-title">
                                    Add task
                                    <svg width="16" height="15" viewBox="0 0 16 15">
                                        <use xlinkHref="#plus"></use>
                                    </svg>
                                </button>
                                <form onSubmit={handleSearchTimesheet} className="section-table__search">
                                    <label className="section-table__search--label">
                                        <input type="search" name="search"
                                               placeholder="Search a project"
                                               className="section-table__search--input"
                                               onChange={e => setSearchValueLocal(e.target.value)}
                                               value={searchValueLocal}
                                        />
                                    </label>
                                    <button className="section-table__search--submit btn is-grey is-min-on-mob"
                                            type="submit">
                                        Search
                                        <svg width="15" height="15" viewBox="0 0 15 15">
                                            <use xlinkHref="#search"></use>
                                        </svg>
                                    </button>
                                </form>
                            </div>
                            <div className="section-table__header--col">

                                <TableSelectYearMonth onSwitch={handleSwitchMonth}/>

                                <TableExport/>

                            </div>
                        </div>
                    </div>
                </div>
                <div className="section-table__header--block-item">
                    <div>
                        <div className="section-table__header--add-task section-table__add-task">
                            <button onClick={handleBackFromCreate} className="section-table__add-task--back back-btn remove-is-active"
                                    data-remove-active-change-title="main-title" type="button"
                                    aria-label="Go back">
                                <svg width="7" height="10" viewBox="0 0 7 10">
                                    <use xlinkHref="#arrow-prev"></use>
                                </svg>
                                <span className="visible-on-mob">
                                    Go back
                                </span>
                            </button>

                            <TableCalendar dateData={dateData} setDateData={setDateData}/>

                            <TableProjectsForUser projectData={projectData} setProjectData={setProjectData}/>

                            <TimesheetHeaderTask taskData={taskData} setTaskData={setTaskData}/>

                            <TimesheetHeaderChooseTime hoursData={hoursData} timeData={timeData} setHoursData={setHoursData} setTimeData={setTimeData} />

                            <button onClick={handleCreateTask} className="section-table__add-task--submit btn" type="submit">
                                {isEditTask ? "Edit task" : "Add task"}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
