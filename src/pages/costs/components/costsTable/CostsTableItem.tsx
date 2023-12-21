import React, {useContext, useEffect, useRef, useState} from 'react'
import {IExpense, ITask, ITimesheet} from "../../../../models";
import {useDispatch, useSelector} from "react-redux";
import {PopupContext} from "../../../../App";
import { BlockToEdit } from '../../Costs';
import {addExpense, addTask} from "../../../../storage/toolkit";
import {getBearer} from "../../../../functions/getBearer";
import axios from "axios";
import {getApiLink} from "../../../../functions/getApiLink";
import {SetExpenses} from "../../../../api/SetExpenses";
import {SetStatistic} from "../../../../api/SetStatistic";

interface ICostsTableItemProps {
    item: IExpense,
    index: number
}

export const CostsTableItem: React.FC<ICostsTableItemProps> = ({item, index}) => {

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

    const handleEditTask = (data: IExpense) => {
        editTask(item)
        setIsOpenContextMenu(false)
    }
    const handleRemoveTask = (data: IExpense) => {
        setPopup({popup: "remove-expense-popup", data})
        setIsOpenContextMenu(false)
    }
    const handleDuplicateTask = (data: IExpense) => {
        // dispatch(addExpense(data))

        getBearer("post")
        axios.post(getApiLink(`/api/expense/duplicate/?expense_id=${item.id}`)).then(({data}) => {

            SetStatistic(dispatch, chosenTimesheet.id)
            SetExpenses(dispatch, chosenTimesheet.id)
        })
        setIsOpenContextMenu(false)
    }

    return (
        <div className="section-table__row drop-down-2" ref={rowBlock} onContextMenu={handleOpenContextMenu}>
            <div className="section-table__param visible-on-mob">
                <span>
                    {index + 1}
                </span>
                <span>
                    {/*{item.date}*/}
                    {item.date.substring(3, 5)}/{item.date.substring(0, 2)}/{item.date.substring(6)}
                </span>
            </div>
            <div className="section-table__param visible-on-desktop is-center">
                {index + 1}
            </div>
            <div className="section-table__param visible-on-desktop is-center">
                {item.date.substring(3, 5)}/{item.date.substring(0, 2)}/{item.date.substring(6)}
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
                            Edit
                        </a>
                    </li>
                    <li>
                        <a onClick={_ => handleDuplicateTask(item)} className="open-popup">
                            <svg width="15" height="16" viewBox="0 0 15 16">
                                <use xlinkHref="#copy"></use>
                            </svg>
                            Duplicate
                        </a>
                    </li>
                    <li>
                        <a onClick={_ => handleRemoveTask(item)} className="open-popup">
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
