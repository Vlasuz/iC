import React, {useContext, useEffect, useRef, useState} from 'react'
import { useDispatch } from 'react-redux';
import {PopupContext} from "../../../../App";
import {ITask} from "../../../../models";
import {addTask} from "../../../../storage/toolkit";
import axios from "axios";
import {getApiLink} from "../../../../functions/getApiLink";
import {getBearer} from "../../../../functions/getBearer";
import {BlockToEdit} from "../../Timesheet";

interface ITimesheetTableItemProps {
    taskItem: ITask
    numberOfRow: number
}

export const TimesheetTableItem: React.FC<ITimesheetTableItemProps> = ({taskItem, numberOfRow}) => {

    const [isOpenContextMenu, setIsOpenContextMenu] = useState(false)
    const [menuPosition, setMenuPosition] = useState({})

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

    const handleOpenContextMenu = (e: React.MouseEvent<HTMLDivElement>) => {
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
                top: e.pageY + 10 + "px",
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
        // setPopup({popup: "edit-employee-popup", data})
        editTask(taskItem)
        setIsOpenContextMenu(false)
    }
    const handleRemoveTask = (data: ITask) => {
        setPopup({popup: "remove-task-popup", data})
        setIsOpenContextMenu(false)
    }
    const handleDuplicateTask = (data: ITask) => {
        getBearer("post")
        axios.post(getApiLink(`/api/task/duplicate/?task_id=${taskItem.id}`)).then(({data}) => {
            dispatch(addTask(data))
        })
        setIsOpenContextMenu(false)
    }

    return (
        <div ref={rowBlock} onContextMenu={handleOpenContextMenu}
             className={`section-table__row drop-down-2 ${numberOfRow % 2 ? " even" : " odd"}` + (isOpenContextMenu ? " is-active-drop-down" : "")}>
            <div className="section-table__param is-center">
                <span>
                    {numberOfRow}
                </span>
            </div>
            <div className="section-table__param">
                {taskItem.project.name}
            </div>
            <div className="section-table__param">
                <p style={{whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis"}}>
                    {taskItem.project.description}
                </p>
            </div>
            <div className="section-table__param">
                {taskItem.task}
            </div>
            <div className="section-table__param">
                {taskItem.time}
            </div>
            <div className="section-table__param">
                {taskItem.hours} h
            </div>

            <div className={"drop-down-2__block" + (isOpenContextMenu ? " active" : "")} ref={modalBlock}
                 style={menuPosition}>
                <ul className="drop-down-2__list">
                    <li>
                        <a onClick={_ => handleEditTask(taskItem)} className="open-popup">
                            <svg width="15" height="16" viewBox="0 0 15 16">
                                <use xlinkHref="#edit"></use>
                            </svg>
                            Edit
                        </a>
                    </li>
                    <li>
                        <a onClick={_ => handleDuplicateTask(taskItem)}>
                            <svg width="24" height="24" viewBox="0 0 24 24">
                                <use xlinkHref="#copy"></use>
                            </svg>
                            Dublicate
                        </a>
                    </li>
                    <li>
                        <a onClick={_ => handleRemoveTask(taskItem)} className="open-popup">
                            <svg width="15" height="16" viewBox="0 0 15 16">
                                <use xlinkHref="#trash"></use>
                            </svg>
                            Delete
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    )
}