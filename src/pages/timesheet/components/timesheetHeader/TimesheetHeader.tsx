import React, {createContext, useContext, useEffect, useRef, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux';
import {IProject, ITask, ITimesheet, IUser} from "../../../../models";
import {useClickOutside} from "../../../../hooks/ClickOutside";
import {TimesheetHeaderChooseTime} from "./TimesheetHeaderChooseTime";
import {TimesheetHeaderTask} from "./TimesheetHeaderTask";
import axios from "axios";
import {getApiLink} from "../../../../functions/getApiLink";
import {getBearer} from "../../../../functions/getBearer";
import {Notifications} from "../../../../components/notifications/Notifications";
import {setTasks} from "../../../../storage/toolkit";
import {BlockToEdit, FixedTopEdit} from "../../Timesheet";
import {TableExportCustom} from "../../../../components/table/TableExportCustom";
import {TableSelectYearMonth} from "../../../../components/table/TableSelectYearMonth";
import {TableProjectsForUser} from '../../../../components/table/TableProjectsForUser';
import {TableCalendar} from "../../../../components/table/TableCalendar";
import {SetTasks} from "../../../../api/SetTasks";
import {SetStatistic} from "../../../../api/SetStatistic";
import {Translate} from "../../../../components/translate/Translate";
import {toast} from "react-toastify";
import {useTranslation} from "react-i18next";
import {useParams} from "react-router-dom";
import { useDownloadExcel } from 'react-export-table-to-excel';
import {CostsExcel} from "../../../costs/components/CostsExcel";
import { TimesheetExcel } from '../TimesheetExcel';

interface ITimesheetHeaderProps {
    itemToEdit: ITask | undefined
    isFixedEditBlock: boolean
    itemToDuplicate: ITask | undefined
    setItemToDuplicate: any
}

export const TimesheetHeader: React.FC<ITimesheetHeaderProps> = ({itemToEdit, isFixedEditBlock, itemToDuplicate, setItemToDuplicate}) => {

    const { t } = useTranslation();

    const {timesheetId}: any = useParams()

    const isEditTask = itemToEdit && Object.keys(itemToEdit).length
    const isDuplicateTask = itemToDuplicate && Object.keys(itemToDuplicate).length

    const timesheet: ITimesheet[] = useSelector((state: any) => state.toolkit.timesheet)
    const chosenTimesheet: ITimesheet = useSelector((state: any) => state.toolkit.chosenTimesheet)
    const userData: IUser = useSelector((state: any) => state.toolkit.user)
    const tasks: ITask[] = useSelector((state: any) => state.toolkit.tasks)

    const [projectData, setProjectData] = useState<IProject | undefined>()
    const [taskData, setTaskData] = useState<string>("")
    const [dateData, setDateData] = useState<string>("")
    const [timeData, setTimeData] = useState<string>("")
    const [hoursData, setHoursData] = useState<number>(0)
    const [searchValueLocal, setSearchValueLocal] = useState("")
    const [isCancelEdit, setIsCancelEdit] = useState(false)
    const [isLoadingToAdd, setIsLoadingToAdd] = useState(false)

    const dispatch = useDispatch()

    const setIsFixedEditBlock: any = useContext(FixedTopEdit)

    const handleCreateTask = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        setIsLoadingToAdd(true)

        const timesheetRequest: any = {
            "project_id": projectData?.id,
            "task": taskData,
            "date": dateData,
            "time": timeData,
            "hours": hoursData
        }

        if (isEditTask) {

            setTimeout(() => {

                getBearer("patch")
                axios.patch(getApiLink("/api/task/edit/?task_id=" + itemToEdit.id), timesheetRequest).then(({data}) => {
                    setIsLoadingToAdd(false)

                    if (data.message === 'occupied_time') {
                        // setIsCancelEdit(false)
                        return toast.error(`${t("time_was_used")}`);
                    }

                    if (data?.status === false) return;

                    // setIsCancelEdit(true)

                    SetStatistic(dispatch, chosenTimesheet.id)
                    SetTasks(dispatch, chosenTimesheet.id)

                    // setTimeout(() => {
                        // setIsFixedEditBlock(false)
                        // setIsCancelEdit(false)
                        // setItemToDuplicate({})
                        // setItemEdit({})

                        // SetStatistic(dispatch, chosenTimesheet.id)
                        // SetTasks(dispatch, chosenTimesheet.id)
                        // setIsOpenCreatBlock(false)
                    // }, 300)
                })

            }, 400)

        } else {
            getBearer("post")
            axios.post(getApiLink(`/api/task/add/?timesheet_id=${chosenTimesheet?.id}`), timesheetRequest).then(({data}) => {
                setIsLoadingToAdd(false)

                if (data?.status === false) {
                    return toast.error(`${t("time_was_used")}`);
                }

                // isDuplicateTask && handleBackFromCreate()

                SetStatistic(dispatch, chosenTimesheet.id)
                SetTasks(dispatch, chosenTimesheet.id)
                // resetFields()
            })
        }
    }

    const lessThenTen = (num: string) => +num < 10 ? "0" + num : num

    useEffect(() => {
        if (!chosenTimesheet?.date) return;
        if (itemToEdit && !Object.keys(itemToEdit).length) return;
        if (isEditTask) setIsOpenCreatBlock(true)

        document.querySelector(".simplebar-content-wrapper")?.scrollTo({
            top: 0,
            behavior: 'smooth'
        });

        setProjectData(itemToEdit?.project ?? undefined)
        setTaskData(itemToEdit?.task ?? "")
        setDateData(itemToEdit?.date?.replaceAll("/", ".") ?? `${lessThenTen(String(getMondayDate().getDate()))}.${chosenTimesheet?.date[3]}${chosenTimesheet?.date[4]}.${getMondayDate().getFullYear()}`)
        setTimeData(itemToEdit?.time ?? "")
        setHoursData(itemToEdit?.hours ?? 0)
    }, [itemToEdit])

    useEffect(() => {
        if (!chosenTimesheet?.date) return;
        if (itemToDuplicate && !Object.keys(itemToDuplicate).length) return;
        if (isDuplicateTask) setIsOpenCreatBlock(true)

        document.querySelector(".simplebar-content-wrapper")?.scrollTo({
            top: 0,
            behavior: 'smooth'
        });

        setProjectData(itemToDuplicate?.project ?? undefined)
        setTaskData(itemToDuplicate?.task ?? "")
        setDateData(itemToDuplicate?.date?.replaceAll("/", ".") ?? `${lessThenTen(String(getMondayDate().getDate()))}.${chosenTimesheet?.date[3]}${chosenTimesheet?.date[4]}.${getMondayDate().getFullYear()}`)
        setTimeData(itemToDuplicate?.time ?? "")
        setHoursData(itemToDuplicate?.hours ?? 0)
    }, [itemToDuplicate])

    const [isOpenCreatBlock, setIsOpenCreatBlock] = useState(false)

    const handleSearchTimesheet = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        getBearer("get")
        axios.get(getApiLink(`/api/timesheet/tasks/?search=${searchValueLocal}`)).then(({data}) => {
            dispatch(setTasks(data))
        })
    }

    useEffect(() => {
        if (searchValueLocal.length > 0) return;

        SetTasks(dispatch, chosenTimesheet?.id)
    }, [searchValueLocal])

    const setItemEdit: any = useContext(BlockToEdit)

    const handleBackFromCreate = () => {
        setIsCancelEdit(true)
        setTimeout(() => {
            setIsFixedEditBlock(false)
            setItemEdit({})
            setItemToDuplicate({})
            setIsOpenCreatBlock(false)
            setIsCancelEdit(false)
        }, isFixedEditBlock ? 400 : 0)
    }


    const handleSwitchMonth = (month: number) => {
        if (!timesheet.length) return;

        const idTasksForMonth = timesheet.filter(item => Number(`${item.date[3]}${item.date[4]}`) === month)[0]?.id

        if (!idTasksForMonth?.length) return;

        getBearer("get")
        axios.get(getApiLink(`/api/timesheet/tasks/?timesheet_id=${idTasksForMonth}`)).then(({data}) => {
            dispatch(setTasks(data))
        })
    }

    function getMondayDate() {
        const today = new Date();

        return today;
    }

    const handleOpenToCreate = () => {
        setIsOpenCreatBlock(true)

        resetFields()
    }

    const resetFields = () => {
        setProjectData(undefined)
        setTaskData("")
    }

    useEffect(() => {
        if (!chosenTimesheet?.date) return;

        setDateData(`${lessThenTen(String(getMondayDate().getDate()))}.${chosenTimesheet?.date[3]}${chosenTimesheet?.date[4]}.${getMondayDate().getFullYear()}`)
    }, [chosenTimesheet])

    const isApprove = chosenTimesheet?.status === "approve" || chosenTimesheet?.status === "waiting"

    const [isOpenInputSearch, setIsOpenInputSearch] = useState(false)
    const {rootEl} = useClickOutside(setIsOpenInputSearch)

    const secondTitle: { [key: string]: string } = {
        "duplicate": `${t("duplicate_task")}`,
        "edit": `${t("edit_task")}`,
        "add": `${t("timesheet_page.top_part.add_task")}`
    }

    console.log(tasks)

    return (
        <div className={`section-table__header ${isFixedEditBlock && "animate-to-show"} ${isCancelEdit && "animate-to-hide"}`}>
            <div className="section-table__header--row is-always-row">
                <div className="section-table__header--col">
                    <h1 className="section-table__title title change-title" id="main-title">
                        <span>


                            <Translate>timesheet_page.table.timesheet</Translate>

                            {
                                isOpenCreatBlock && " / "
                            }
                            {
                                isOpenCreatBlock && (secondTitle[isDuplicateTask ? "duplicate" : isEditTask ? "edit" : "add"])
                            }

                            {
                                chosenTimesheet?.user?.id && chosenTimesheet?.user?.id !== userData?.id &&
                                <span> ({chosenTimesheet?.user?.first_name} {chosenTimesheet?.user?.last_name})</span>
                            }

                        </span>
                    </h1>
                </div>

                <Notifications/>

            </div>
            <div className={`section-table__header--block block-for-is-active ${isOpenCreatBlock && "is-active"}`} >
                <div className="section-table__header--block-item">
                    <div>
                        <div className="section-table__header--row row-2">
                            <div className="section-table__header--col">
                                <button disabled={isApprove} onClick={handleOpenToCreate} type="button"
                                        className="section-table__add btn add-is-active"
                                        data-add-active-change-title="main-title">
                                    <Translate>timesheet_page.top_part.add_task</Translate>
                                    <svg width="16" height="15" viewBox="0 0 16 15">
                                        <use xlinkHref="#plus"></use>
                                    </svg>
                                </button>
                                <form ref={rootEl} onSubmit={handleSearchTimesheet}
                                      className={`section-table__search ${isOpenInputSearch && "is-active"}`}>
                                    <label className="section-table__search--label">
                                        <input type="search" name="search"
                                               className="section-table__search--input"
                                               onChange={e => setSearchValueLocal(e.target.value)}
                                               value={searchValueLocal}
                                        />
                                        <span className="placeholder">
                                            {!searchValueLocal && <Translate>timesheet_page.top_part.search_a_project</Translate>}
                                        </span>
                                    </label>
                                    <button onClick={_ => setIsOpenInputSearch(true)} className="section-table__search--submit btn is-grey is-min-on-mob"
                                            type="submit">
                                        <Translate>timesheet_page.top_part.search</Translate>
                                        <svg width="15" height="15" viewBox="0 0 15 15">
                                            <use xlinkHref="#search"></use>
                                        </svg>
                                    </button>
                                </form>
                            </div>
                            <div className="section-table__header--col">

                                <TableSelectYearMonth onSwitch={handleSwitchMonth}/>

                                <TableExportCustom
                                    excelFile={(e: any) => TimesheetExcel({chosenTimesheet, tasks, translate: t})}
                                />

                                {/*<button onClick={onDownload}>dwnl</button>*/}

                            </div>
                        </div>
                    </div>
                </div>
                <div className="section-table__header--block-item">
                    <div>
                        <form onSubmit={handleCreateTask} className="section-table__header--add-task section-table__add-task">
                            <button onClick={handleBackFromCreate}
                                    className="section-table__add-task--back back-btn remove-is-active"
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

                            <TimesheetHeaderChooseTime hoursData={hoursData} timeData={timeData}
                                                       setHoursData={setHoursData} setTimeData={setTimeData}/>

                            <button disabled={isLoadingToAdd} className="section-table__add-task--submit btn" type="submit">
                                {!isLoadingToAdd ? (isEditTask ? <Translate>edit_task</Translate> : <Translate>timesheet_page.top_part.add_task</Translate>) : <Translate>loading</Translate>}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
