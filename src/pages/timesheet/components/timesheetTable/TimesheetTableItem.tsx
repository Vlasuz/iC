import React, {useContext, useEffect, useRef, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {PopupContext} from "../../../../App";
import {ITask, ITimesheet} from "../../../../models";
import {addTask} from "../../../../storage/toolkit";
import axios from "axios";
import {getApiLink} from "../../../../functions/getApiLink";
import {getBearer} from "../../../../functions/getBearer";
import {BlockToEdit} from "../../Timesheet";
import {SetTasks} from "../../../../api/SetTasks";
import {SetStatistic} from "../../../../api/SetStatistic";
import {Translate} from "../../../../components/translate/Translate";

interface ITimesheetTableItemProps {
    taskItem: ITask
    numberOfRow: number
}

export const TimesheetTableItem: React.FC<ITimesheetTableItemProps> = ({taskItem, numberOfRow}) => {

    const [isOpenContextMenu, setIsOpenContextMenu] = useState(false)
    const [menuPosition, setMenuPosition] = useState({})

    const chosenTimesheet: ITimesheet = useSelector((state: any) => state.toolkit.chosenTimesheet)

    const dispatch = useDispatch()

    const modalBlock: any = useRef(null)
    const rowBlock: any = useRef(null)

    useEffect(() => {

        const onClick = (e: any) => modalBlock.current.contains(e.target) || setIsOpenContextMenu(false);
        const onContext = (e: any) => rowBlock.current.contains(e.target) || setIsOpenContextMenu(false);

        document.addEventListener('click', onClick);
        document.addEventListener('contextmenu', onContext);
        return () => {
            document.removeEventListener('click', onClick);
            document.removeEventListener('contextmenu', onContext);
        }
    }, []);

    const isApprove = chosenTimesheet.status === "approve"

    const handleOpenContextMenu = (e: React.MouseEvent<HTMLDivElement>) => {
        if(isApprove) return;

        e.preventDefault()

        if (isOpenContextMenu) {
            setTimeout(() => {
                setMenuPosition({
                    top: "auto",
                    left: "auto"
                })
            }, 300)
        } else {
            setMenuPosition({
                top: e.pageY > 470 ? e.pageY - 160 : e.pageY + 10 + "px",
                left: e.pageX + 10 + "px"
            })
        }

        setIsOpenContextMenu(prev => !prev)
    }

    useEffect(() => {
        if (!isOpenContextMenu) {
            setTimeout(() => {
                setMenuPosition({
                    top: "auto",
                    left: "auto"
                })
            }, 300)
        }
    }, [isOpenContextMenu])

    const setPopup: any = useContext(PopupContext)
    const editTask: any = useContext(BlockToEdit)

    const handleEditTask = (data: ITask) => {
        editTask(taskItem)
        setIsOpenContextMenu(false)

        document.querySelector(".main__inner")?.closest(".simplebar-content-wrapper")?.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
    const handleRemoveTask = (data: ITask) => {
        setPopup({popup: "remove-task-popup", data})
        setIsOpenContextMenu(false)
    }
    const handleDuplicateTask = (data: ITask) => {
        getBearer("post")
        axios.post(getApiLink(`/api/task/duplicate/?task_id=${taskItem.id}`)).then(({data}) => {

            SetStatistic(dispatch, chosenTimesheet.id)
            SetTasks(dispatch, chosenTimesheet.id)
        })
        setIsOpenContextMenu(false)
    }

    return (
        <div ref={rowBlock} onContextMenu={handleOpenContextMenu}
             className={`section-table__row drop-down-2 ${numberOfRow % 2 ? " even" : " odd"}` + (isOpenContextMenu ? " is-active-drop-down" : "")}>
            <div className={`section-table__param is-center ${numberOfRow % 2 ? " even" : " odd"}`}>
                <span>
                    {numberOfRow}
                </span>
            </div>
            <div className="section-table__param">
                {taskItem.project?.name}
            </div>
            <div className="section-table__param">
                <p style={{whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis"}}>
                    {taskItem.project?.description}
                </p>
            </div>
            <div className="section-table__param">
                {taskItem.task}
            </div>
            <div className="section-table__param">
                {taskItem.time}
            </div>
            <div className="section-table__param">
                {taskItem.hours} <Translate>timesheet_page.table.h</Translate>
            </div>

            <div className={"drop-down-2__block" + (isOpenContextMenu ? " active" : "")} ref={modalBlock}
                 style={menuPosition}>
                <ul className="drop-down-2__list">
                    <li>
                        <a onClick={_ => handleEditTask(taskItem)} className="open-popup">
                            <svg width="15" height="16" viewBox="0 0 15 16">
                                <use xlinkHref="#edit"></use>
                            </svg>
                            <Translate>timesheet_page.popups.edit</Translate>
                        </a>
                    </li>
                    <li>
                        <a onClick={_ => handleDuplicateTask(taskItem)}>
                            <svg width="24" height="24" viewBox="0 0 24 24">
                                <use xlinkHref="#copy"></use>
                            </svg>
                            <Translate>timesheet_page.popups.duplicate</Translate>
                        </a>
                    </li>
                    <li>
                        <a onClick={_ => handleRemoveTask(taskItem)} className="open-popup">
                            <svg width="15" height="16" viewBox="0 0 15 16">
                                <use xlinkHref="#trash"></use>
                            </svg>
                            <Translate>timesheet_page.popups.delete</Translate>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    )
}
