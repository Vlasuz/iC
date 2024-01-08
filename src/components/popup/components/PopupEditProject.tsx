import React, {useContext, useEffect, useState} from 'react'
import {IsPopupActiveContext} from "../PopupList";
import {getBearer} from "../../../functions/getBearer";
import axios from "axios";
import {getApiLink} from "../../../functions/getApiLink";
import {editProject} from "../../../storage/toolkit";
import { useDispatch } from 'react-redux';
import {useMask} from "@react-input/mask";
import {PopupClose} from "./PopupClose";
import {Translate} from "../../translate/Translate";
import {PopupCloseCancel} from "./PopupCloseCancel";

interface IPopupEditProjectProps {
    data: any
}

export const PopupEditProject: React.FC<IPopupEditProjectProps> = ({data}) => {

    const [nameValue, setNameValue] = useState<string>('')
    const [descriptionValue, setDescriptionValue] = useState<string>('')

    useEffect(() => {
        setNameValue(data.name)
        setDescriptionValue(data.description)
    }, [data])

    const dispatch = useDispatch()

    const setIsPopupActive: any = useContext(IsPopupActiveContext)

    const handleAddProject = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const newDataProject = {
            "name": nameValue,
            "description": descriptionValue,
        }

        getBearer("patch")
        axios.patch(getApiLink("/api/admin/project/edit/?project_id=" + data.id), newDataProject).then((res) => {
            const newData = res.data

            setIsPopupActive(false)
            dispatch(editProject({data, newData}))
        }).catch(er => console.log(getApiLink("/api/admin/project/add/"), er))
    }

    return (
        <div className="add-project__body popup-body">
            <h2 className="add-project__title popup-title title">
                <Translate>edit_project</Translate>
            </h2>
            <PopupClose/>
            <div className="add-project__container popup-container" data-simplebar
                 data-simplebar-auto-hide="false">
                <form onSubmit={handleAddProject} className="add-project__form popup-form">
                    <div className="popup-form__row">
                        <label className="popup-form__label is-full">
                            <span>
                                <Translate>projects_admin.project_name</Translate>
                            </span>
                            <span className="input_placeholder">
                                <input type="text" name="project-name" required
                                       className="input" value={nameValue} onChange={e => setNameValue(e.target.value)}/>
                                <span className="placeholder">
                                    {!nameValue && <Translate>projects_admin.project_name</Translate>}
                                </span>
                            </span>
                        </label>
                    </div>
                    <div className="popup-form__row">
                        <label className="popup-form__label is-full">
                            <span>
                                <Translate>projects_admin.project_description</Translate>
                            </span>
                            <span className="input_placeholder">
                                <input type="text" name="project-description" required
                                       className="input" onChange={e => setDescriptionValue(e.target.value)} value={descriptionValue}/>
                                <span className="placeholder">
                                    {!descriptionValue && <Translate>projects_admin.project_description</Translate>}
                                </span>
                            </span>
                        </label>
                    </div>
                    <div className="popup-form__row is-min-gap">
                        <PopupCloseCancel/>
                        <button className="popup-form__submit btn" type="submit">
                            <Translate>projects_admin.save</Translate>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
