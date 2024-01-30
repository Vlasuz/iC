import React, {useContext, useEffect, useRef, useState} from 'react'
import axios from "axios";
import {getBearer} from "../../../functions/getBearer";
import {getApiLink} from "../../../functions/getApiLink";
import {useDispatch} from 'react-redux';
import {addProject} from '../../../storage/toolkit';
import {IsPopupActiveContext} from "../PopupList";
import {Translate} from "../../translate/Translate";
import {PopupCloseCancel} from "./PopupCloseCancel";
import {PopupClose} from "./PopupClose";
import {useTranslation} from "react-i18next";

interface IPopupAddProjectProps {

}

export const PopupAddProject: React.FC<IPopupAddProjectProps> = () => {

    const dispatch = useDispatch()

    const [nameValue, setNameValue] = useState<string>('')
    const [descriptionValue, setDescriptionValue] = useState<string>('')
    const setIsPopupActive: any = useContext(IsPopupActiveContext)

    const handleAddProject = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        getBearer("post")
        axios.post(getApiLink("/api/admin/project/add/"), {
            "name": nameValue,
            "description": descriptionValue
        }).then(({data}) => {
            dispatch(addProject(data))
            setIsPopupActive(false)
        }).catch(er => console.log(getApiLink("/api/admin/project/add/"), er))
    }

    const {t} = useTranslation();

    return (
        <div className="add-project__body popup-body">
            <h2 className="add-project__title popup-title title">
                <Translate>projects_admin.add_new_project</Translate>
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
                            <input type="text" name="project-name" required
                                   className="input" value={nameValue} onChange={e => setNameValue(e.target.value)}
                                   placeholder={`${t("projects_admin.project_name")}`}
                            />
                        </label>
                    </div>
                    <div className="popup-form__row">
                        <label className="popup-form__label is-full">
                            <span>
                                <Translate>projects_admin.project_description</Translate>
                            </span>
                            <input type="text" name="project-description" required
                                   className="input" onChange={e => setDescriptionValue(e.target.value)}
                                   value={descriptionValue}
                                   placeholder={`${t("projects_admin.project_description")}`}
                            />
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
