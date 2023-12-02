import React, {useContext, useEffect, useRef, useState} from 'react'
import axios from "axios";
import {getBearer} from "../../../functions/getBearer";
import {getApiLink} from "../../../functions/getApiLink";
import { useDispatch } from 'react-redux';
import { addProjects } from '../../../storage/toolkit';
import {IsPopupActiveContext} from "../PopupList";

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
            dispatch(addProjects(data))
            setIsPopupActive(false)
        }).catch(er => console.log(getApiLink("/api/admin/project/add/"), er))
    }

    return (
        <div className="add-project__body popup-body">
            <h2 className="add-project__title popup-title title">
                Add new project
            </h2>
            <button type="button" className="add-project__close-btn popup-close-btn" onClick={_ => setIsPopupActive(false)} title="Close">
                <svg width="15" height="15" viewBox="0 0 15 15">
                    <use xlinkHref="#close"></use>
                </svg>
            </button>
            <div className="add-project__container popup-container" data-simplebar
                 data-simplebar-auto-hide="false">
                <form onSubmit={handleAddProject} className="add-project__form popup-form">
                    <div className="popup-form__row">
                        <label className="popup-form__label is-full">
                            <span>Project name</span>
                            <input type="text" name="project-name" required placeholder="Project name"
                                   className="input" value={nameValue} onChange={e => setNameValue(e.target.value)}/>
                        </label>
                    </div>
                    <div className="popup-form__row">
                        <label className="popup-form__label is-full">
                            <span>Project description</span>
                            <input type="text" name="project-description" required
                                   placeholder="Project description" className="input" onChange={e => setDescriptionValue(e.target.value)} value={descriptionValue}/>
                        </label>
                    </div>
                    <div className="popup-form__row is-min-gap">
                        <button className="popup-form__cancel btn is-transparent" onClick={_ => setIsPopupActive(false)} type="button">
                            Cancel
                        </button>
                        <button className="popup-form__submit btn" type="submit">
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
