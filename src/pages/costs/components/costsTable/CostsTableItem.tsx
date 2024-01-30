import React, {useContext, useEffect, useRef, useState} from 'react'
import {IExpense, ITask, ITimesheet} from "../../../../models";
import {useDispatch, useSelector} from "react-redux";
import {PopupContext} from "../../../../App";
import {BlockToDuplicate, BlockToEdit, FixedTopEdit } from '../../Costs';
import {addExpense, addTask} from "../../../../storage/toolkit";
import {getBearer} from "../../../../functions/getBearer";
import axios from "axios";
import {getApiLink} from "../../../../functions/getApiLink";
import {SetExpenses} from "../../../../api/SetExpenses";
import {SetStatistic} from "../../../../api/SetStatistic";
import {Translate} from "../../../../components/translate/Translate";
import {handleOpenContextMenu} from "../../../../functions/handleOpenContextMenu";

interface ICostsTableItemProps {
    item: IExpense,
    index: number
    itemToEdit: any
}

export const CostsTableItem: React.FC<ICostsTableItemProps> = ({item, index, itemToEdit}) => {

    const [isOpenContextMenu, setIsOpenContextMenu] = useState(false)
    const [menuPosition, setMenuPosition] = useState({})

    const chosenTimesheet: ITimesheet = useSelector((state: any) => state.toolkit.chosenTimesheet)
    const expenseList: IExpense[] = useSelector((state: any) => state.toolkit.expenses)

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

    const isApprove = chosenTimesheet?.status === "waiting"

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

    const handleEditTask = (data?: IExpense) => {
        editTask(item)
        setIsOpenContextMenu(false)
        setIsFixedEditBlock(true)
    }
    const handleRemoveTask = (data: IExpense) => {
        setPopup({popup: "remove-expense-popup", data})
        setIsOpenContextMenu(false)
    }
    const handleDuplicateTask = (data: IExpense) => {

        duplicateTask(item)
        setIsFixedEditBlock(true)
        setIsOpenContextMenu(false)

    }

    return (
        <div className="section-table__row drop-down-2" ref={rowBlock} style={{border: itemToEdit?.id === item?.id ? "1px solid red" : ""}} onContextMenu={e => handleOpenContextMenu({e, isOpenContextMenu, setMenuPosition, setIsOpenContextMenu, height: 160, width: 165})}>
            <div className="section-table__param visible-on-mob">
                <span>
                    {expenseList.length - index}
                </span>
                <span>
                    {/*{item.date.substring(0, 2)}/{item.date.substring(3, 5)}/{item.date.substring(6)}*/}
                    {item.date.replaceAll(".", "/")}
                </span>
            </div>
            <div className="section-table__param visible-on-desktop is-center">
                {expenseList.length - index}
            </div>
            <div className="section-table__param visible-on-desktop is-center">
                {/*{item.date.substring(0, 2)}/{item.date.substring(3, 5)}/{item.date.substring(6)}*/}
                {item.date.replaceAll(".", "/")}
            </div>
            <div className="section-table__param is-center">
                {item.project.name}
            </div>
            <div className="section-table__param">
                {item.project.description}
            </div>
            <div className="section-table__param">
                {item.description}
            </div>
            <div className="section-table__param is-center">
                {item.sum}
            </div>

            <div className={"drop-down-2__block" + (isOpenContextMenu ? " active" : "")} ref={modalBlock}
                 style={menuPosition}>
                <ul className="drop-down-2__list">
                    <li>
                        <a onClick={_ => handleEditTask(item)} className="open-popup">
                            <svg width="15" height="16" viewBox="0 0 15 16">
                                <use xlinkHref="#edit"></use>
                            </svg>
                            <Translate>timesheet_page.popups.edit</Translate>
                        </a>
                    </li>
                    <li>
                        <a onClick={_ => handleDuplicateTask(item)} className="open-popup">
                            <svg width="15" height="16" viewBox="0 0 15 16">
                                <use xlinkHref="#copy"></use>
                            </svg>
                            <Translate>timesheet_page.popups.duplicate</Translate>
                        </a>
                    </li>
                    <li>
                        <a onClick={_ => handleRemoveTask(item)} className="open-popup">
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
