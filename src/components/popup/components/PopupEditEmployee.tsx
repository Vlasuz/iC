import React, {useContext, useEffect, useRef, useState} from 'react'
import {useDispatch, useSelector } from 'react-redux'
import {IEmployee, IProject} from "../../../models";
import {getBearer} from "../../../functions/getBearer";
import axios from "axios";
import {getApiLink} from "../../../functions/getApiLink";
import {addEmployee, editEmployee} from "../../../storage/toolkit";
import {CustomSelect1} from "../../select/CustomSelect1";
import {IsPopupActiveContext} from "../PopupList";
import { CustomSelect } from '../../customSelect/CustomSelect';
import {PhoneCodes} from "../../../constants/PhoneCodes";
import {EmployeesStatus} from "../../../constants/EmployeesStatus";
import {PopupCloseCancel} from "./PopupCloseCancel";
import {PopupClose} from "./PopupClose";

interface IPopupEditEmployeeProps {
    setIsOpenProjects: any
    data: any
    chosenProjects: IProject[]
}

export const PopupEditEmployee: React.FC<IPopupEditEmployeeProps> = ({setIsOpenProjects, data, chosenProjects}) => {

    const projects: IProject[] = useSelector((state: any) => state.toolkit.projects)
    const setIsPopupActive: any = useContext(IsPopupActiveContext)

    const dispatch = useDispatch()

    const [firstNameValue, setFirstNameValue] = useState<string>('')
    const [lastNameValue, setLastNameValue] = useState<string>('')
    const [roleValue, setRoleValue] = useState<string>('')
    const [statusValue, setStatusValue] = useState<string>('')
    const [emailValue, setEmailValue] = useState<string>('')
    const [phoneValue, setPhoneValue] = useState<string>('')
    const [holidaysValue, setHolidaysValue] = useState<string>('')
    const [projectsList, setProjectsList] = useState<string[]>([])
    const [phoneCode, setPhoneCode]: any = useState({})

    useEffect(() => {
        setFirstNameValue(data.first_name)
        setLastNameValue(data.last_name)
        setRoleValue(data.role)
        setEmailValue(data.email)
        setPhoneValue(data.phone.slice(data.phone.indexOf(" ") + 1))
        setStatusValue(data.status)
        setHolidaysValue(String(data.holidays))
        setProjectsList(data.projects?.map((item: any) => item.id))

        setPhoneCode(PhoneCodes().filter(item => item.label === data.phone.slice(0, data.phone.indexOf(" ")))[0])
    }, [data])

    useEffect(() => {
        setProjectsList(chosenProjects.map(item => item.id))
    }, [chosenProjects])

    const handleChange = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const newDataEmployee = {
            "first_name": firstNameValue,
            "last_name": lastNameValue,
            "role": roleValue,
            "status": statusValue,
            "email": emailValue,
            "phone": `${phoneCode.label} ${phoneValue}`,
            "holidays": +holidaysValue,
            "projects": projectsList,
            "all_projects": chosenProjects?.length === projects.length
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
            <PopupClose/>
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
                            <CustomSelect1 onChange={(e: any) => setStatusValue(e.value)} list={EmployeesStatus()} defaultValue={EmployeesStatus().filter(item => item.value === data.status)[0]} />
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
                                <CustomSelect list={PhoneCodes()} setSelectedItem={setPhoneCode} selectValue={phoneCode}
                                              defaultValue={PhoneCodes()[0]}/>
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
