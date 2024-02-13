import React, {useContext, useEffect, useRef, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {PopupContext} from "../../../../App";
import {ITask, ITimesheet} from "../../../../models";
import {BlockToDuplicate, BlockToEdit, FixedTopEdit} from "../../Timesheet";
import {Translate} from "../../../../components/translate/Translate";
import {handleOpenContextMenu} from "../../../../functions/handleOpenContextMenu";

interface ITimesheetTableItemProps {
    taskItem: ITask
    numberOfRow: number
    itemToEdit: any
}

export const TimesheetTableItem: React.FC<ITimesheetTableItemProps> = ({taskItem, numberOfRow, itemToEdit}) => {

    const [isOpenContextMenu, setIsOpenContextMenu] = useState(false)
    const [menuPosition, setMenuPosition] = useState({})

    const taskList: ITask[] = useSelector((state: any) => state.toolkit.tasks)
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

    const isApprove = chosenTimesheet?.status === "approve" || chosenTimesheet?.status === "waiting"

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
    const duplicateTask: any = useContext(BlockToDuplicate)
    const setIsFixedEditBlock: any = useContext(FixedTopEdit)

    const handleEditTask = (data?: ITask) => {
        editTask(taskItem)
        setIsOpenContextMenu(false)

        setIsFixedEditBlock(true)
    }
    const handleRemoveTask = (data: ITask) => {
        setPopup({popup: "remove-task-popup", data})
        setIsOpenContextMenu(false)
    }
    const handleDuplicateTask = (data: ITask) => {

        duplicateTask(taskItem)
        setIsFixedEditBlock(true)
        setIsOpenContextMenu(false)

    }

    return (
        <div ref={rowBlock} style={{border: itemToEdit?.id === taskItem?.id ? "1px solid red" : ""}} onContextMenu={e => !isApprove && handleOpenContextMenu({e, isOpenContextMenu, setMenuPosition, setIsOpenContextMenu, height: 160, width: 165})}
             className={`section-table__row drop-down-2 ${numberOfRow % 2 ? " even" : " odd"}` + (isOpenContextMenu ? " is-active-drop-down" : "")}>
            <div className={`section-table__param is-center ${numberOfRow % 2 ? " even" : " odd"}`}>
                <span>
                    {taskList?.length - numberOfRow + 1}
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
