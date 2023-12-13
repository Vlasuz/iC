import React, {useContext, useEffect} from 'react'
import {IsPopupActiveContext} from "../PopupList";
import {useDispatch} from "react-redux";
import {getBearer} from "../../../functions/getBearer";
import axios from "axios";
import {getApiLink} from "../../../functions/getApiLink";
import {removeEmployee, removeProject} from "../../../storage/toolkit";
import {PopupCloseCancel} from "./PopupCloseCancel";
import {PopupClose} from "./PopupClose";

interface IPopupRemoveProjectProps {
    data: any
}

export const PopupRemoveProject: React.FC<IPopupRemoveProjectProps> = ({data}) => {

    const setIsPopupActive: any = useContext(IsPopupActiveContext)
    const dispatch = useDispatch()

    const handleDelete = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        getBearer('delete')
        axios.delete(getApiLink('/api/admin/project/delete/?project_id=' + data.id)).then((res) => {
            const dataItem = res.data
            if (!dataItem.status) return;

            setIsPopupActive(false)
            dispatch(removeProject(data))

        }).catch(er => console.log(getApiLink('/api/admin/employee/delete/'), er))

    }

    return (
        <div className="remove-table-item__body popup-body">
            <PopupClose/>
            <div className="remove-table-item__container popup-container" data-simplebar
                 data-simplebar-auto-hide="false">
                <h2 className="remove-table-item__title popup-title title is-center">
                    Are you sure you want to delete this row?
                </h2>
                <form onSubmit={handleDelete} className="popup-form">
                    <div className="popup-form__row is-min-gap">
                        <PopupCloseCancel/>
                        <button className="popup-form__submit btn" type="submit">
                            Delete
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
