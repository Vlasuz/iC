import React, {useContext, useEffect, useRef, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {IEmployee, IProject} from "../../../models";
import {getBearer} from "../../../functions/getBearer";
import axios from "axios";
import {getApiLink} from "../../../functions/getApiLink";
import {addEmployee, editEmployee} from "../../../storage/toolkit";
import {CustomSelect1} from "../../select/CustomSelect1";
import {IsPopupActiveContext, IsPopupActiveSecondContext} from "../PopupList";
import {CustomSelect} from '../../customSelect/CustomSelect';
import {PhoneCodes} from "../../../constants/PhoneCodes";
import {EmployeesStatus} from "../../../constants/EmployeesStatus";
import {PopupCloseCancel} from "./PopupCloseCancel";
import {PopupClose} from "./PopupClose";
import {useMask} from "@react-input/mask";
import {SetEmployees} from "../../../api/SetEmployees";
import {Translate} from "../../translate/Translate";
import {PopupContext} from "../../../App";
import SimpleBar from "simplebar-react";

interface IPopupEditEmployeeProps {
    setIsOpenProjects: any
    data: any
    chosenProjects: IProject[]
    popup: any
}

export const PopupEditEmployee: React.FC<IPopupEditEmployeeProps> = ({setIsOpenProjects, data, chosenProjects, popup}) => {

    const projects: IProject[] = useSelector((state: any) => state.toolkit.projects)
    const setIsPopupActive: any = useContext(IsPopupActiveContext)
    const setIsPopupSecondActive: any = useContext(IsPopupActiveSecondContext)

    const dispatch = useDispatch()

    const [firstNameValue, setFirstNameValue] = useState<string>('')
    const [lastNameValue, setLastNameValue] = useState<string>('')
    const [roleValue, setRoleValue] = useState<string>('')
    const [statusValue, setStatusValue] = useState(EmployeesStatus().filter(item => item.value === data.status)[0])
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
        setStatusValue(EmployeesStatus().filter(item => item.value === data.status)[0])
        setHolidaysValue(String(data.holidays))
        setProjectsList(data.projects?.map((item: any) => item.id))

        setPhoneCode(PhoneCodes().filter(item => item.label === data.phone.slice(0, data.phone.indexOf(" ")))[0])
    }, [data])

    useEffect(() => {
        setProjectsList(chosenProjects.map(item => item.id))
    }, [chosenProjects])

    const handleChange = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        console.log(statusValue)

        const newDataEmployee = {
            "first_name": firstNameValue,
            "last_name": lastNameValue,
            "role": roleValue,
            "status": statusValue.value,
            "email": emailValue,
            "phone": phoneValue ? `${phoneCode.label} ${phoneValue}` : "",
            "holidays": +holidaysValue,
            "projects": projectsList,
            "all_projects": chosenProjects?.length === projects.length
        }

        getBearer('patch')
        axios.patch(getApiLink("/api/admin/employee/edit/?employee_id=" + data.id), newDataEmployee).then(({data}) => {
            console.log(getApiLink("/api/admin/employee/edit/?employee_id=" + data.id), data)
            if (!data.status) return;

            // @ts-ignore
            // newDataEmployee['id'] = data.id;

            // dispatch(editEmployee({data, newDataEmployee}))

            setIsPopupActive(false)
            SetEmployees(dispatch)
        }).catch(er => console.log(getApiLink("/api/admin/employee/edit/"), er))
    }

    const inputRef = useMask({mask: '(__) ___ __ __', replacement: {_: /\d/}});

    const setPopup: any = useContext(PopupContext)

    const handleChangePassword = () => {
        setIsPopupSecondActive(true)
        setPopup({
            popup: popup.popup,
            secondPopup: "reset-password-popup",
            data: data
        })
    }

    console.log(chosenProjects?.length, projects.length)

    return (
        <div className="add-new-employee__body popup-body">
            <h2 className="popup-title title">
                <Translate>employees_admin.others.edit_employee</Translate>
            </h2>
            <PopupClose/>
            <SimpleBar autoHide={false} className="add-new-employee__container popup-container">
                <form onSubmit={handleChange} className="popup-form">
                    <div className="popup-form__row">
                        <label className="popup-form__label">
                            <span>
                                <Translate>employees_admin.others.first_name</Translate>
                            </span>
                            <input type="text" name="first-name" required placeholder="First name"
                                   value={firstNameValue} onChange={e => setFirstNameValue(e.target.value)}
                                   className="input"/>
                        </label>
                        <label className="popup-form__label">
                            <span>
                                <Translate>employees_admin.others.last_name</Translate>
                            </span>
                            <input type="text" name="last-name" required placeholder="Second name"
                                   value={lastNameValue} onChange={e => setLastNameValue(e.target.value)}
                                   className="input"/>
                        </label>
                    </div>
                    <div className="popup-form__row">
                        <label className="popup-form__label">
                            <span>
                                <Translate>employees_admin.others.position</Translate>
                            </span>
                            <input onChange={e => setRoleValue(e.target.value)} value={roleValue} type="text"
                                   name="role" required className="input"/>
                        </label>
                        <label className="popup-form__label">
                            <span>
                                <Translate>employees_admin.others.category</Translate>
                            </span>
                            <CustomSelect selectValue={statusValue} setSelectedItem={setStatusValue}
                                          list={EmployeesStatus()}/>
                        </label>
                    </div>
                    <div className="popup-form__row">
                        <label className="popup-form__label">
                            <span>Email</span>
                            <input onChange={e => setEmailValue(e.target.value)} value={emailValue} type="email"
                                   name="email" required className="input"/>
                        </label>
                        <label className="popup-form__label">
                            <span>
                                <Translate>employees_admin.others.password</Translate>
                            </span>
                            <span>
                                <a onClick={handleChangePassword} className="profile__info--button open-popup">
                                    <Translate>reset_password.change_pass</Translate>
                                </a>
                                {/*<input type="password" name="password" required*/}
                                {/*       className="input password-input"/>*/}
                                {/*<button className="password-input__visible-toggle" type="button"*/}
                                {/*        title="Show/Hide password">*/}
                                {/*    <svg width="15" height="15" viewBox="0 0 15 15">*/}
                                {/*        <use xlinkHref="#password-hidden"></use>*/}
                                {/*    </svg>*/}
                                {/*    <svg width="15" height="15" viewBox="0 0 15 15">*/}
                                {/*        <use xlinkHref="#password-viewed"></use>*/}
                                {/*    </svg>*/}
                                {/*</button>*/}
                            </span>
                        </label>
                    </div>
                    <div className="popup-form__row">
                        <label className="popup-form__item">
                            <span>
                                <Translate>employees_admin.others.phone_number</Translate>
                            </span>
                            <div className="popup-form__item--row tel-parent">
                                <CustomSelect list={PhoneCodes()} setSelectedItem={setPhoneCode} selectValue={phoneCode}
                                              defaultValue={PhoneCodes()[0]}/>
                                <input
                                    onChange={e => setPhoneValue(e.target.value)}
                                    value={phoneValue} ref={inputRef} type="text" name="tel"
                                    className="input"/>
                            </div>
                        </label>
                        <label className="popup-form__label">
                            <span>
                                <Translate>employees_admin.others.vacation</Translate>
                            </span>
                            <input type="number" className={"input"}
                                   onChange={e => setHolidaysValue(+e.target.value > 99 ? "99" : e.target.value)}
                                   value={+holidaysValue > 99 ? 99 : holidaysValue}/>
                            {!!holidaysValue.length &&
                                <span className={"input-title"} style={{left: +holidaysValue < 10 ? "34px" : "42px"}}>
                                <Translate>employees_admin.others.days_per_year</Translate>
                            </span>}
                        </label>
                    </div>
                    <div className="popup-form__row">
                        <label className="popup-form__label is-full">
                            <span>
                                <Translate>employees_admin.others.projects</Translate>
                            </span>
                            <a onClick={_ => setIsOpenProjects((prev: any) => !prev)}
                               className="popup-form__open-sub-popup open-popup">
                                <span id="checked-projects" data-none-text="None" data-text-1="project"
                                      data-text-2="projects" data-all-text="All projects">
                                    {chosenProjects?.length === projects.length ?
                                        <Translate>employees_admin.others.all_projects</Translate> : `${chosenProjects?.length} projects`}
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
                            <Translate>employees_admin.others.save</Translate>
                        </button>
                    </div>
                </form>
            </SimpleBar>
        </div>
    )
}
