import React, {useContext, useEffect} from 'react'
import {IsPopupActiveContext} from "../PopupList";
import {useDispatch, useSelector} from "react-redux";
import {getBearer} from "../../../functions/getBearer";
import axios from "axios";
import {getApiLink} from "../../../functions/getApiLink";
import {removeEmployee, removeTask} from "../../../storage/toolkit";
import {IEmployee, ITask, ITimesheet} from "../../../models";
import {PopupClose} from "./PopupClose";
import {PopupCloseCancel} from "./PopupCloseCancel";
import {SetTasks} from "../../../api/SetTasks";
import {SetStatistic} from "../../../api/SetStatistic";
import {Translate} from "../../translate/Translate";

interface IPopupDeleteTaskProps {
    data: ITask
}

export const PopupDeleteTask: React.FC<IPopupDeleteTaskProps> = ({data}) => {

    const setIsPopupActive: any = useContext(IsPopupActiveContext)
    const dispatch = useDispatch()

    const chosenTimesheet: ITimesheet = useSelector((state: any) => state.toolkit.chosenTimesheet)

    const handleDelete = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        getBearer('delete')
        axios.delete(getApiLink('/api/task/delete/?task_id=' + data.id)).then((res) => {
            const dataItem = res.data
            if (!dataItem.status) return;

            setIsPopupActive(false)
            dispatch(removeTask(data))

            // SetTasks(dispatch, chosenTimesheet.id)
            SetStatistic(dispatch, chosenTimesheet.id)

        }).catch(er => console.log(getApiLink('/api/admin/employee/delete/'), er))

    }

    return (
        <div className="remove-table-item__body popup-body">
            <PopupClose/>
            <div className="remove-table-item__container popup-container" data-simplebar
                 data-simplebar-auto-hide="false">
                <h2 className="remove-table-item__title popup-title title is-center">
                    <Translate>employees_admin.others.confirm_delete_row</Translate>
                </h2>
                <form onSubmit={handleDelete} className="popup-form">
                    <div className="popup-form__row is-min-gap">
                        <PopupCloseCancel/>
                        <button className="popup-form__submit btn" type="submit">
                            <Translate>employees_admin.others.delete</Translate>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
