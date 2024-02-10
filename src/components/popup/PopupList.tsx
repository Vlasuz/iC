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
import {PopupApproveTimesheet} from './components/PopupApproveTimesheet';
import {PopupApproveEmployeeTimesheet} from "./components/PopupApproveEmployeeTimesheet";
import {PopupResetPasswordThankYou} from "./components/PopupResetPasswordThankYou";
import {PopupResetPassword} from "./components/PopupResetPassword";
import {PopupReviewToTimesheet} from "./components/PopupReviewToTimesheet";
import {PopupListStyled} from "./PopupList.styled";
import {PopupResetPasswordInput} from "./components/PopupResetPasswordInput";
import {PopupResetPasswordSent} from "./components/PopupResetPasswordSent";

interface IPopupListProps {
    popup: any
}

export const IsPopupActiveContext: any = createContext(null)
export const IsPopupActiveSecondContext: any = createContext(null)

export const PopupList: React.FC<IPopupListProps> = ({popup}) => {

    const [isPopupActive, setIsPopupActive] = useState(false)
    const [isPopupSecondActive, setIsPopupSecondActive] = useState(false)
    const [isOpenProjects, setIsOpenProjects] = useState(false)
    const [chosenProjects, setChosenProjects] = useState<IProject[]>([])

    const popupList: { [key: string]: React.ReactNode } = {
        "forgot-password-popup": <PopupForgotPassword popup={popup} data={popup.data}/>,

        "add-new-employee-popup": <PopupAddEmployee data={popup.data} chosenProjects={chosenProjects}
                                                    setIsOpenProjects={setIsOpenProjects}/>,
        "edit-employee-popup": <PopupEditEmployee popup={popup} data={popup.data} chosenProjects={chosenProjects}
                                                  setIsOpenProjects={setIsOpenProjects}/>,
        "edit-project-popup": <PopupEditProject data={popup.data}/>,
        "add-project-popup": <PopupAddProject/>,
        "remove-employee-popup": <PopupDeleteEmployee data={popup.data}/>,
        "remove-task-popup": <PopupDeleteTask data={popup.data}/>,
        "remove-expense-popup": <PopupDeleteExpense data={popup.data}/>,
        "remove-project-popup": <PopupRemoveProject data={popup.data}/>,

        "approve-timesheet-popup": <PopupApproveTimesheet data={popup.data}/>,
        "approve-employee-timesheet-popup": <PopupApproveEmployeeTimesheet data={popup.data}/>,
        "review-employee-timesheet-popup": <PopupReviewToTimesheet data={popup.data}/>,

        "profile-popup": <PopupProfile data={popup.data}/>,
        "edit-profile-popup": <PopupEditProfile popup={popup}/>,

        "reset-password-input-popup": <PopupResetPasswordInput popup={popup} data={popup.data}/>,
        "reset-password-popup": <PopupResetPassword popup={popup} data={popup.data}/>,
        "reset-password-thanks-popup": <PopupResetPasswordThankYou popup={popup} data={popup.data}/>,
        "reset-password-sent-popup": <PopupResetPasswordSent popup={popup} data={popup.data}/>,
    }

    const setPopup: any = useContext(PopupContext)

    useEffect(() => {
        if (!popup.popup) return;

        setIsPopupActive(true)
    }, [popup.popup])

    useEffect(() => {
        if (isPopupActive) return;

        setTimeout(() => setChosenProjects([]), 500)

        setTimeout(() => {
            if (popup.popup === "profile-popup") return;

            setPopup("")
        }, 500)
    }, [isPopupActive])


    useEffect(() => {
        if (!popup.secondPopup) return;

        setIsPopupActive(true)
    }, [popup.secondPopup])

    useEffect(() => {
        if (isPopupSecondActive) return;

        setTimeout(() => setChosenProjects([]), 500)

        // setTimeout(() => {
            // if (popup.secondPopup === "profile-popup") return;

        // }, 500)
    }, [isPopupSecondActive])

    const sidePopup = ["profile-popup", "edit-profile-popup"]

    const handleClosePopup = () => {
        setIsPopupActive(false)

        setTimeout(() => {
            setPopup("")
        }, 500)
    }

    return (
        <PopupListStyled>
            <IsPopupActiveSecondContext.Provider value={setIsPopupSecondActive}>
                <IsPopupActiveContext.Provider value={setIsPopupActive}>
                    <div
                        className={"popup" + (isPopupActive ? " is-active" : "") + (sidePopup.includes(popup.popup) ? " side-popup" : "")}
                        style={{display: "flex"}}>
                        <div className="popup-wrapper">
                            <div className="add-project__bg popup-bg" onClick={handleClosePopup}/>

                            {popupList[popup.popup]}

                        </div>
                    </div>

                    <PopupEmployeeProjects data={popup.data} setChosenProjects={setChosenProjects}
                                           chosenProjects={chosenProjects} isOpenProjects={isOpenProjects}
                                           setIsOpenProjects={setIsOpenProjects}/>

                    <div
                        className={"popup" + ((popup.secondPopup && isPopupSecondActive) ? " is-active" : "") + (sidePopup.includes(popup.secondPopup) ? " side-popup" : "")}
                        style={{display: "flex"}}>
                        <div className="popup-wrapper">
                            <div className="add-project__bg popup-bg" onClick={_ => setIsPopupSecondActive(false)}/>

                            {popup.secondPopup && popupList[popup.secondPopup]}

                        </div>
                    </div>


                </IsPopupActiveContext.Provider>
            </IsPopupActiveSecondContext.Provider>
        </PopupListStyled>
    )
}
