import React, {useContext, useEffect, useRef, useState} from 'react'
import {useDispatch, useSelector } from 'react-redux'
import {IEmployee, IProject} from "../../../models";
import {getBearer} from "../../../functions/getBearer";
import axios from "axios";
import {getApiLink} from "../../../functions/getApiLink";
import {addEmployee, editEmployee} from "../../../storage/toolkit";
import {CustomSelect} from "../../select/CustomSelect";
import {IsPopupActiveContext} from "../PopupList";

interface IPopupEditEmployeeProps {
    setIsOpenProjects: any
    isOpenProjects: boolean
    data: any
    chosenProjects: IProject[]
}

export const PopupEditEmployee: React.FC<IPopupEditEmployeeProps> = ({setIsOpenProjects, data, chosenProjects}) => {

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

    const dispatch = useDispatch()

    const [firstNameValue, setFirstNameValue] = useState<string>('')
    const [lastNameValue, setLastNameValue] = useState<string>('')
    const [roleValue, setRoleValue] = useState<string>('')
    const [statusValue, setStatusValue] = useState<string>('')
    const [emailValue, setEmailValue] = useState<string>('')
    const [phoneValue, setPhoneValue] = useState<string>('')
    const [holidaysValue, setHolidaysValue] = useState<string>('')
    const [projectsList, setProjectsList] = useState<string[]>([])

    useEffect(() => {
        setFirstNameValue(data.first_name)
        setLastNameValue(data.last_name)
        setRoleValue(data.role)
        setEmailValue(data.email)
        setPhoneValue(data.phone)
        setStatusValue(data.status)
        setHolidaysValue(String(data.holidays))
        setProjectsList(data.projects?.map((item: any) => item.id))
    }, [data])

    useEffect(() => {
        setProjectsList(chosenProjects?.map(item => item.id))
    }, [chosenProjects])

    const handleChange = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const newDataEmployee = {
            "first_name": firstNameValue,
            "last_name": lastNameValue,
            "role": roleValue,
            "status": statusValue,
            "email": emailValue,
            "phone": phoneValue,
            "holidays": +holidaysValue,
            "projects": projectsList,
            "all_projects": chosenProjects.length === projects.length
        }

        getBearer('patch')
        axios.patch(getApiLink("/api/admin/employee/edit/?employee_id=" + data.id), newDataEmployee).then(({data}) => {
            console.log(getApiLink("/api/admin/employee/edit/?employee_id=" + data.id), data)
            if (!data.status) return;

            // @ts-ignore
            newDataEmployee['id'] = data.id;

            setIsPopupActive(false)
            dispatch(editEmployee({data, newDataEmployee}))
        }).catch(er => console.log(getApiLink("/api/admin/employee/edit/"), er))
    }

    return (
        <div className="add-new-employee__body popup-body">
            <h2 className="popup-title title">
                Edit employee
            </h2>
            <button type="button" className="add-new-employee__close-btn popup-close-btn popup-close"
                    title="Close">
                <svg width="15" height="15" viewBox="0 0 15 15">
                    <use xlinkHref="#close"></use>
                </svg>
            </button>
            <div className="add-new-employee__container popup-container" data-simplebar
                 data-simplebar-auto-hide="false">
                <form onSubmit={handleChange} className="popup-form">
                    <div className="popup-form__row">
                        <label className="popup-form__label">
                            <span>First name</span>
                            <input type="text" name="first-name" required placeholder="First name"
                                   value={firstNameValue} onChange={e => setFirstNameValue(e.target.value)} className="input"/>
                        </label>
                        <label className="popup-form__label">
                            <span>Second name</span>
                            <input type="text" name="last-name" required placeholder="Second name"
                                   value={lastNameValue} onChange={e => setLastNameValue(e.target.value)} className="input"/>
                        </label>
                    </div>
                    <div className="popup-form__row">
                        <label className="popup-form__label">
                            <span>Role</span>
                            <input onChange={e => setRoleValue(e.target.value)} value={roleValue} type="text" name="role" required className="input"/>
                        </label>
                        <label className="popup-form__label">
                            <span>Status on the web-site</span>
                            <CustomSelect onChange={(e: any) => setStatusValue(e.value)} list={statusList} defaultValue={statusList.filter(item => item.value === data.status)[0]} />
                        </label>
                    </div>
                    <div className="popup-form__row">
                        <label className="popup-form__label">
                            <span>Email</span>
                            <input onChange={e => setEmailValue(e.target.value)} value={emailValue} type="email" name="email" required className="input"/>
                        </label>
                    </div>
                    <div className="popup-form__row">
                        <label className="popup-form__item">
                            <span>Phone number</span>
                            <div className="popup-form__item--row tel-parent">
                                <CustomSelect list={numberCodes} />
                                <input onChange={e => setPhoneValue(e.target.value)} value={phoneValue} type="tel" name="tel" required className="input"/>
                            </div>
                        </label>
                        <label className="popup-form__label">
                            <span>Holidays</span>
                            {/*<input  type="text" name="days-year" required data-add-text="days/year"*/}
                            {/*       data-max="99" className="input input-number"/>*/}
                            <input type="text" className={"input"} onChange={e => setHolidaysValue(e.target.value)} value={holidaysValue}/>
                        </label>
                    </div>
                    <div className="popup-form__row">
                        <label className="popup-form__label is-full">
                            <span>Projects</span>
                            <a onClick={_ => setIsOpenProjects((prev: any) => !prev)} className="popup-form__open-sub-popup open-popup">
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
