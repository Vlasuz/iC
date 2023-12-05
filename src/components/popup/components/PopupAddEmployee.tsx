import React, {useContext, useEffect, useRef, useState} from 'react'
import {IProject} from "../../../models";
import axios from "axios";
import {getApiLink} from "../../../functions/getApiLink";
import {getBearer} from "../../../functions/getBearer";
import {useDispatch, useSelector} from "react-redux";
import {addEmployee} from "../../../storage/toolkit";
import {IsPopupActiveContext} from "../PopupList";
import {PopupContext} from "../../../App";
import SimpleBar from 'simplebar-react';
import Select from 'react-select'
import {CustomSelect} from "../../select/CustomSelect";

interface IPopupAddNewEmployeeProps {
    setIsOpenProjects: any
    isOpenProjects: boolean
    chosenProjects: IProject[]
}

export const PopupAddEmployee: React.FC<IPopupAddNewEmployeeProps> = ({setIsOpenProjects, chosenProjects}) => {

    const projects: IProject[] = useSelector((state: any) => state.toolkit.projects)
    const setIsPopupActive: any = useContext(IsPopupActiveContext)

    const statusList = [
        {
            value: "team_manager",
            label: "Team manager"
        },
        {
            value: "top_manager",
            label: "Top manager"
        },
        {
            value: "employee",
            label: "Employee"
        },
    ]

    const numberCodes = [
        {
            value: "+380",
            label: "+380"
        },
        {
            value: "+1",
            label: "+1"
        }
    ]

    const [firstNameValue, setFirstNameValue] = useState<string>('')
    const [lastNameValue, setLastNameValue] = useState<string>('')
    const [roleValue, setRoleValue] = useState<string>('')
    const [statusValue, setStatusValue] = useState<string>(statusList[0].value)
    const [emailValue, setEmailValue] = useState<string>('')
    const [passwordValue, setPasswordValue] = useState<string>('')
    const [phoneValue, setPhoneValue] = useState<string>('')
    const [holidaysValue, setHolidaysValue] = useState<string>('')
    const [projectsList, setProjectsList] = useState<string[]>([])

    const dispatch = useDispatch()

    const handleCreateNewEmployee = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        getBearer('post')
        axios.post(getApiLink("/api/admin/employee/add/"), {
            "first_name": firstNameValue,
            "last_name": lastNameValue,
            "role": roleValue,
            "status": statusValue,
            "email": emailValue,
            "phone": phoneValue,
            "holidays": +holidaysValue,
            "password": passwordValue,
            "projects": projectsList,
            "all_projects": chosenProjects.length === projects.length
        }).then(({data}) => {
            // if (!data.status) return;
            setIsPopupActive(false)
            dispatch(addEmployee(data))
        }).catch(er => console.log(getApiLink("/api/admin/employee/add/"), er))
    }


    useEffect(() => {
        setProjectsList(chosenProjects?.map(item => item.id))
    }, [chosenProjects])

    return (
        <div className="add-new-employee__body popup-body">
            <h2 className="popup-title title">
                Add employee
            </h2>
            <button type="button" className="add-new-employee__close-btn popup-close-btn"
                    onClick={_ => setIsPopupActive(false)} title="Close">
                <svg width="15" height="15" viewBox="0 0 15 15">
                    <use xlinkHref="#close"></use>
                </svg>
            </button>
            <div className="add-new-employee__container popup-container" data-simplebar
                 data-simplebar-auto-hide="false">
                <form onSubmit={handleCreateNewEmployee} className="popup-form">
                    <div className="popup-form__row">
                        <label className="popup-form__label">
                            <span>First name</span>
                            <input onChange={e => setFirstNameValue(e.target.value)} value={firstNameValue} type="text"
                                   name="first-name" required className="input"/>
                        </label>
                        <label className="popup-form__label">
                            <span>Second name</span>
                            <input onChange={e => setLastNameValue(e.target.value)} value={lastNameValue} type="text"
                                   name="last-name" required className="input"/>
                        </label>
                    </div>
                    <div className="popup-form__row">
                        <label className="popup-form__label">
                            <span>Role</span>
                            <input onChange={e => setRoleValue(e.target.value)} value={roleValue} type="text"
                                   name="role" required className="input"/>
                        </label>
                        <label className="popup-form__label">
                            <span>Status on the web-site</span>
                            <CustomSelect onChange={(e: any) => setStatusValue(e.value)} list={statusList}/>
                        </label>
                    </div>
                    <div className="popup-form__row">
                        <label className="popup-form__label">
                            <span>Email</span>
                            <input onChange={e => setEmailValue(e.target.value)} value={emailValue} type="email"
                                   name="email" required className="input"/>
                        </label>
                        <label className="popup-form__label">
                            <span>Password</span>
                            <span>
                                <input onChange={e => setPasswordValue(e.target.value)}
                                       value={passwordValue} type="password" name="password" required
                                       className="input password-input"/>
                                <button className="password-input__visible-toggle" type="button"
                                        title="Show/Hide password">
                                    <svg width="15" height="15" viewBox="0 0 15 15">
                                        <use xlinkHref="#password-hidden"></use>
                                    </svg>
                                    <svg width="15" height="15" viewBox="0 0 15 15">
                                        <use xlinkHref="#password-viewed"></use>
                                    </svg>
                                </button>
                            </span>
                        </label>
                    </div>
                    <div className="popup-form__row">
                        <label className="popup-form__item">
                            <span>Phone number</span>
                            <div className="popup-form__item--row tel-parent">
                                <CustomSelect list={numberCodes}/>
                                <input onChange={e => setPhoneValue(e.target.value)} value={phoneValue} type="tel"
                                       name="tel" required className="input"/>
                            </div>
                        </label>
                        <label className="popup-form__label">
                            <span>Holidays</span>
                            <input type="text" className={"input"} onChange={e => setHolidaysValue(e.target.value)}
                                   value={holidaysValue}/>
                        </label>
                    </div>
                    <div className="popup-form__row">
                        <label className="popup-form__label is-full">
                            <span>Projects</span>
                            <a onClick={_ => setIsOpenProjects((prev: any) => !prev)}
                               className="popup-form__open-sub-popup open-popup">
                                                <span id="checked-projects" data-none-text="None" data-text-1="project"
                                                      data-text-2="projects" data-all-text="All projects">
                                                    {projectsList?.length} projects
                                                </span>
                                <svg width="10" height="7" viewBox="0 0 10 7">
                                    <use xlinkHref="#drop-down-arrow"></use>
                                </svg>
                            </a>
                        </label>
                    </div>
                    <div className="popup-form__row is-min-gap">
                        <button className="popup-form__cancel btn is-transparent" onClick={_ => setIsPopupActive(false)}
                                type="button">
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
