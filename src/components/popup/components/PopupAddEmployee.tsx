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
import {PhoneCodes} from '../../../constants/PhoneCodes';
import {EmployeesStatus} from '../../../constants/EmployeesStatus';
import {PopupClose} from "./PopupClose";
import {PopupCloseCancel} from "./PopupCloseCancel";
import {useMask} from '@react-input/mask';
import {SetEmployees} from "../../../api/SetEmployees";
import {Translate} from "../../translate/Translate";
import {toast} from 'react-toastify';
import {useTranslation} from "react-i18next";

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
    const [statusValue, setStatusValue] = useState(EmployeesStatus()[0])
    const [emailValue, setEmailValue] = useState<string>('')
    const [passwordValue, setPasswordValue] = useState<string>('')
    const [phoneValue, setPhoneValue] = useState<string>('')
    const [holidaysValue, setHolidaysValue] = useState<string>('')
    const [projectsList, setProjectsList] = useState<string[]>([])
    const [phoneCode, setPhoneCode]: any = useState(PhoneCodes()[0])

    const {t} = useTranslation()

    const handleCreateNewEmployee = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if(passwordValue.length < 8) {
            return toast.error(`${t("pass_min")} ${passwordValue.length}`);
        }

        const newDataEmployee = {
            "first_name": firstNameValue.trim(),
            "last_name": lastNameValue.trim(),
            "role": roleValue.trim(),
            "status": statusValue.value.trim(),
            "email": emailValue.trim(),
            "phone": phoneValue ? `${phoneCode.label} ${phoneValue}` : "",
            "holidays": +holidaysValue,
            "password": passwordValue.trim(),
            "projects": projectsList,
            "all_projects": chosenProjects?.length === projects.length
        }

        getBearer('post')
        axios.post(getApiLink("/api/admin/employee/add/"), newDataEmployee).then(({data}) => {
            if (!data?.status) {

                if (data.message === "user_exist") {
                    toast.error(<Translate>user_exist</Translate>)
                }

                return console.log(data.message);
            }

            // dispatch(addEmployee(data))

            setIsPopupActive(false)
            SetEmployees(dispatch)
        }).catch(er => console.log(getApiLink("/api/admin/employee/add/"), er))
    }

    useEffect(() => {
        if (!chosenProjects.length) return;
        setProjectsList(chosenProjects.map(item => item.id))
    }, [chosenProjects])

    useEffect(() => {
        if (!data?.projects.length) return;
        setProjectsList(data?.projects.map((item: IProject) => item.id))
    }, [data?.projects])

    const [isOpenPassword, setIsOpenPassword] = useState(false)

    const inputRef = useMask({mask: '(__) ___ __ __', replacement: {_: /\d/}});

    const handleSetPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPasswordValue(e.target.value.trim())
    }

    // const handleCheckInput = (e: any) => {
    //     // e.setCustomValidity('')
    //     console.log(e)
    //     if (e.validity.valueMissing) {
    //         e.setCustomValidity("Нет значения")
    //     }
    //     if (e.validity.typeMismatch) {
    //         e.setCustomValidity("Не соответствует типу")
    //     }
    //     if (e.validity.patternMismatch) {
    //         e.setCustomValidity("Не соответствует паттерну")
    //     }
    // }

    return (
        <div className="add-new-employee__body popup-body">
            <h2 className="popup-title title">
                <Translate>employees_admin.others.add_new_employee</Translate>
            </h2>
            <PopupClose/>
            <SimpleBar autoHide={false} className="add-new-employee__container popup-container">
                <form autoComplete="off" onSubmit={handleCreateNewEmployee} className="popup-form">
                    <div className="popup-form__row">
                        <label className="popup-form__label">
                            <span>
                                <Translate>employees_admin.others.first_name</Translate>
                            </span>
                            <input onChange={e => setFirstNameValue(e.target.value)} autoComplete="off" value={firstNameValue} type="text"
                                   required name={"tick"} id={"tick"} className="input"/>
                        </label>
                        <label className="popup-form__label">
                            <span>
                                <Translate>employees_admin.others.last_name</Translate>
                            </span>
                            <input onChange={e => setLastNameValue(e.target.value)} autoComplete="off" value={lastNameValue} type="text"
                                   name={"tick1"} id={"tick1"} required className="input"/>
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
                            <span>Ema<span className={"delete"}>111</span>il</span>
                            <input autoComplete="off" onChange={e => setEmailValue(e.target.value)} value={emailValue}
                                   type="email"
                                   required className="input"/>
                        </label>
                        <label className="popup-form__label">
                            <span>
                                <Translate>employees_admin.others.password</Translate>
                            </span>
                            <span>
                                <input autoComplete="off" onChange={handleSetPassword}
                                       value={passwordValue} type={`${isOpenPassword ? "text" : "password"}`}
                                       name="password" required
                                       className="input password-input"/>
                                <button className="password-input__visible-toggle" type="button"
                                        title="Show/Hide password" onClick={_ => setIsOpenPassword(prev => !prev)}>
                                    {isOpenPassword ?
                                        <svg width="15" height="15" viewBox="0 0 15 15">
                                            <use xlinkHref="#password-viewed"></use>
                                        </svg>
                                        :
                                        <svg width="15" height="15" viewBox="0 0 15 15">
                                            <use xlinkHref="#password-hidden"></use>
                                        </svg>
                                    }
                                </button>
                            </span>
                        </label>
                    </div>
                    <div className="popup-form__row">
                        <label className="popup-form__item">
                            <span>
                                <Translate>employees_admin.others.phone_number</Translate>
                            </span>
                            <div className="popup-form__item--row tel-parent">
                                <CustomSelect list={PhoneCodes()} setSelectedItem={setPhoneCode}
                                              selectValue={phoneCode}/>
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
                                   value={+holidaysValue > 99 ? 99 : (holidaysValue === "0" ? "" : holidaysValue)}/>
                            {!!holidaysValue.length &&
                                <span className={"input-title"} style={{left: +holidaysValue.length === 1 ? "34px" : +holidaysValue.length === 2 ? "42px" : "50px"}}>
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
                                        <Translate>employees_admin.others.all_projects</Translate> : `${chosenProjects?.length} `}

                                    {
                                        chosenProjects?.length !== projects.length && <Translate>employees_admin.others.projects</Translate>
                                    }
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
