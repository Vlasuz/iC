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
import {CustomSelect1} from "../../select/CustomSelect1";
import {CustomSelect} from "../../customSelect/CustomSelect";
import { PhoneCodes } from '../../../constants/PhoneCodes';
import { EmployeesStatus } from '../../../constants/EmployeesStatus';
import {PopupClose} from "./PopupClose";
import {PopupCloseCancel} from "./PopupCloseCancel";

interface IPopupAddNewEmployeeProps {
    setIsOpenProjects: any
    data: any
    chosenProjects: IProject[]
}

export const PopupAddEmployee: React.FC<IPopupAddNewEmployeeProps> = ({data, setIsOpenProjects, chosenProjects}) => {

    const projects: IProject[] = useSelector((state: any) => state.toolkit.projects)
    const setIsPopupActive: any = useContext(IsPopupActiveContext)

    const dispatch = useDispatch()

    const [firstNameValue, setFirstNameValue] = useState<string>('')
    const [lastNameValue, setLastNameValue] = useState<string>('')
    const [roleValue, setRoleValue] = useState<string>('')
    const [statusValue, setStatusValue] = useState<string>(EmployeesStatus()[0].value)
    const [emailValue, setEmailValue] = useState<string>('')
    const [passwordValue, setPasswordValue] = useState<string>('')
    const [phoneValue, setPhoneValue] = useState<string>('')
    const [holidaysValue, setHolidaysValue] = useState<string>('')
    const [projectsList, setProjectsList] = useState<string[]>([])
    const [phoneCode, setPhoneCode]: any = useState(PhoneCodes()[0])

    const handleCreateNewEmployee = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const newDataEmployee = {
            "first_name": firstNameValue,
            "last_name": lastNameValue,
            "role": roleValue,
            "status": statusValue,
            "email": emailValue,
            "phone": `${phoneCode.label} ${phoneValue}`,
            "holidays": +holidaysValue,
            "password": passwordValue,
            "projects": projectsList,
            "all_projects": chosenProjects?.length === projects.length
        }

        getBearer('post')
        axios.post(getApiLink("/api/admin/employee/add/"), newDataEmployee).then(({data}) => {
            if (!data?.status) {
                return console.log(data.message);
            }

            setIsPopupActive(false)
            dispatch(addEmployee(data))
        }).catch(er => console.log(getApiLink("/api/admin/employee/add/"), er))
    }

    useEffect(() => {
        setProjectsList(chosenProjects.map(item => item.id))
    }, [chosenProjects])

    useEffect(() => {
        setProjectsList(data?.projects.map((item: IProject) => item.id))
    }, [data?.projects])

    return (
        <div className="add-new-employee__body popup-body">
            <h2 className="popup-title title">
                Add employee
            </h2>
            <PopupClose/>
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
                            <CustomSelect1 onChange={(e: any) => setStatusValue(e.value)} list={EmployeesStatus()}/>
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
                                <CustomSelect list={PhoneCodes()} setSelectedItem={setPhoneCode} selectValue={phoneCode}/>
                                <input
                                    onChange={e => setPhoneValue(e.target.value.length <= 9 ? e.target.value : phoneValue)}
                                    value={phoneValue} minLength={9} type="number" name="tel" required
                                    className="input"/>
                            </div>
                        </label>
                        <label className="popup-form__label">
                            <span>Holidays</span>
                            <input type="number" className={"input"}
                                   onChange={e => setHolidaysValue(+e.target.value > 99 ? "99" : e.target.value)}
                                   value={+holidaysValue > 99 ? 99 : holidaysValue}/>
                            {!!holidaysValue.length &&
                                <span className={"input-title"} style={{left: +holidaysValue < 10 ? "34px" : "42px"}}>
                                days/year
                            </span>}
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
                        <PopupCloseCancel/>
                        <button className="popup-form__submit btn" type="submit">
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
