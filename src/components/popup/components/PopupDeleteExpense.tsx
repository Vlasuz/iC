import React, {useContext, useEffect} from 'react'
import {IsPopupActiveContext} from "../PopupList";
import {useDispatch, useSelector} from "react-redux";
import {getBearer} from "../../../functions/getBearer";
import axios from "axios";
import {getApiLink} from "../../../functions/getApiLink";
import {SetExpenses} from "../../../api/SetExpenses";
import {SetStatistic} from "../../../api/SetStatistic";
import {ITimesheet} from "../../../models";
import {removeExpense, removeTask} from "../../../storage/toolkit";

interface IPopupDeleteExpenseProps {
    data: any
}

export const PopupDeleteExpense: React.FC<IPopupDeleteExpenseProps> = ({data}) => {

    const setIsPopupActive: any = useContext(IsPopupActiveContext)
    const dispatch = useDispatch()

    const chosenTimesheet: ITimesheet = useSelector((state: any) => state.toolkit.chosenTimesheet)

    const handleDelete = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        getBearer('delete')
        axios.delete(getApiLink('/api/expense/delete/?expense_id=' + data.id)).then((res) => {
            const dataItem = res.data
            if (!dataItem.status) return;

            setIsPopupActive(false)
            dispatch(removeExpense(data))

            // SetExpenses(dispatch, chosenTimesheet.id)
            SetStatistic(dispatch, chosenTimesheet.id)

        }).catch(er => console.log(getApiLink('/api/admin/expense/delete/'), er))

    }

    return (
        <div className="remove-table-item__body popup-body">
            <button type="button" className="remove-table-item__close-btn popup-close-btn popup-close"
                    title="Close">
                <svg width="15" height="15" viewBox="0 0 15 15">
                    <use xlinkHref="#close"></use>
                </svg>
            </button>
            <div className="remove-table-item__container popup-container" data-simplebar
                 data-simplebar-auto-hide="false">
                <h2 className="remove-table-item__title popup-title title is-center">
                    Are you sure you want to delete this row?
                </h2>
                <form onSubmit={handleDelete} className="popup-form">
                    <div className="popup-form__row is-min-gap">
                        <button className="popup-form__cancel btn is-transparent popup-close" type="button">
                            Cancel
                        </button>
                        <button className="popup-form__submit btn" type="submit">
                            Delete
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
