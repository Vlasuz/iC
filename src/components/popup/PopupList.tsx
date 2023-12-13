import React, {createContext, useContext, useEffect, useState} from 'react'
import {PopupAddEmployee} from "./components/PopupAddEmployee";
import {PopupEditEmployee} from "./components/PopupEditEmployee";
import {PopupDeleteEmployee} from "./components/PopupDeleteEmployee";
import {PopupAddProject} from "./components/PopupAddProject";
import {PopupEditProject} from "./components/PopupEditProject";
import {PopupForgotPassword} from "./components/PopupForgotPassword";
import {PopupContext} from "../../App";
import {PopupEmployeeProjects} from "./components/PopupEmployeeProjects";
import {PopupRemoveProject} from "./components/PopupRemoveProject";
import {IProject} from "../../models";
import {PopupProfile} from "./components/PopupProfile";
import {PopupEditProfile} from "./components/PopupEditProfile";
import {PopupDeleteTask} from "./components/PopupDeleteTask";
import {PopupDeleteExpense} from "./components/PopupDeleteExpense";
import { PopupApproveTimesheet } from './components/PopupApproveTimesheet';
import {PopupApproveEmployeeTimesheet} from "./components/PopupApproveEmployeeTimesheet";
import {PopupResetPasswordThankYou} from "./components/PopupResetPasswordThankYou";
import {PopupResetPassword} from "./components/PopupResetPassword";

interface IPopupListProps {
    popup: any
}

export const IsPopupActiveContext: any = createContext(null)

export const PopupList: React.FC<IPopupListProps> = ({popup}) => {

    const [isPopupActive, setIsPopupActive] = useState(false)
    const [isOpenProjects, setIsOpenProjects] = useState(false)
    const [chosenProjects, setChosenProjects] = useState<IProject[]>([])

    const popupList: {[key: string]: React.ReactNode} = {
        "forgot-password-popup": <PopupForgotPassword/>,
        "add-new-employee-popup": <PopupAddEmployee data={popup.data} chosenProjects={chosenProjects} setIsOpenProjects={setIsOpenProjects} />,
        "edit-employee-popup": <PopupEditEmployee data={popup.data} chosenProjects={chosenProjects} setIsOpenProjects={setIsOpenProjects} />,
        "edit-project-popup": <PopupEditProject data={popup.data} />,
        "add-project-popup": <PopupAddProject/>,
        "remove-employee-popup": <PopupDeleteEmployee data={popup.data} />,
        "remove-task-popup": <PopupDeleteTask data={popup.data} />,
        "remove-expense-popup": <PopupDeleteExpense data={popup.data} />,
        "remove-project-popup": <PopupRemoveProject data={popup.data} />,

        "approve-timesheet-popup": <PopupApproveTimesheet data={popup.data} />,
        "approve-employee-timesheet-popup": <PopupApproveEmployeeTimesheet data={popup.data}/>,

        "profile-popup": <PopupProfile/>,
        "edit-profile-popup": <PopupEditProfile/>,

        "reset-password-popup": <PopupResetPassword/>,
        "reset-password-thanks-popup": <PopupResetPasswordThankYou/>,
    }

    const setPopup: any = useContext(PopupContext)

    useEffect(() => {
        if(!popup.popup) return;

        setIsPopupActive(true)
    }, [popup.popup])

    useEffect(() => {
        if(isPopupActive) return;

        setTimeout(() => {
            if(popup.popup === "profile-popup") return;

            setPopup("")
        }, 500)
    }, [isPopupActive])

    useEffect(() => {
        if (isPopupActive) return;

        setTimeout(() => setChosenProjects([]), 500)
    }, [isPopupActive])

    const sidePopup = ["profile-popup", "edit-profile-popup"]

    return (
        <IsPopupActiveContext.Provider value={setIsPopupActive}>
            <div className={"popup" + (isPopupActive ? " is-active" : "") + (sidePopup.includes(popup.popup) ? " side-popup" : "")} style={{display: "flex"}}>
                <div className="popup-wrapper">
                    <div className="add-project__bg popup-bg" onClick={_ => setIsPopupActive(false)} />

                    {popupList[popup.popup]}

                </div>
            </div>

            <PopupEmployeeProjects data={popup.data} setChosenProjects={setChosenProjects} chosenProjects={chosenProjects} isOpenProjects={isOpenProjects} setIsOpenProjects={setIsOpenProjects} />

            <div className={"popup" + ((popup.secondPopup && isPopupActive) ? " is-active" : "") + (sidePopup.includes(popup.secondPopup) ? " side-popup" : "")} style={{display: "flex"}}>
                <div className="popup-wrapper">
                    <div className="add-project__bg popup-bg" onClick={_ => setIsPopupActive(false)} />

                    {popup.secondPopup && popupList[popup.secondPopup]}

                </div>
            </div>


        </IsPopupActiveContext.Provider>
    )
}
