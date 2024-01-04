import React, {useContext, useEffect, useRef} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import axios from "axios";
import {getApiLink} from "../../../functions/getApiLink";
import {getBearer} from "../../../functions/getBearer";
import {IEmployee} from "../../../models";
import {IsPopupActiveContext} from "../PopupList";
import {SetEmployees} from "../../../api/SetEmployees";

interface IPopupDeleteEmployeeProps {
    data: IEmployee
}

export const PopupDeleteEmployee: React.FC<IPopupDeleteEmployeeProps> = ({data}) => {

    const setIsPopupActive: any = useContext(IsPopupActiveContext)
    const dispatch = useDispatch()

    console.log(data)

    const handleDelete = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        getBearer('delete')
        axios.delete(getApiLink('/api/admin/employee/delete/?employee_id=' + data.id)).then((res) => {
            const dataItem = res.data
            if (!dataItem.status) return;

            setIsPopupActive(false)
            // dispatch(removeEmployee(data))

            SetEmployees(dispatch)

        }).catch(er => console.log(getApiLink('/api/admin/employee/delete/'), er))

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
