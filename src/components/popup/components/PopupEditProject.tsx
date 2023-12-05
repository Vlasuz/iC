import React, {useContext, useEffect, useState} from 'react'
import {IsPopupActiveContext} from "../PopupList";
import {getBearer} from "../../../functions/getBearer";
import axios from "axios";
import {getApiLink} from "../../../functions/getApiLink";
import {editProject} from "../../../storage/toolkit";
import { useDispatch } from 'react-redux';

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
                Edit project
            </h2>
            <button type="button" className="add-project__close-btn popup-close-btn popup-close"
                    title="Close">
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
                        <button className="popup-form__cancel btn is-transparent popup-close" type="button">
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
