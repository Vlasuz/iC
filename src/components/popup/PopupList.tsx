import React, {createContext, useContext, useEffect, useState} from 'react'
import {PopupAddEmployee} from "./components/PopupAddEmployee";
import {PopupEditEmployee} from "./components/PopupEditEmployee";
import {PopupDeleteEmployee} from "./components/PopupDeleteEmployee";
import {PopupAddProject} from "./components/PopupAddProject";
import {PopupEditProject} from "./components/PopupEditProject";
import {PopupForgotPassword} from "./components/PopupForgotPassword";
import {PopupContext} from "../../App";
import {PopupEmployeeProjects} from "./components/PopupEmployeeProjects";

interface IPopupListProps {
    popup: any
}

export const IsPopupActiveContext: any = createContext(null)

export const PopupList: React.FC<IPopupListProps> = ({popup}) => {

    const [isPopupActive, setIsPopupActive] = useState(false)
    const [isOpenProjects, setIsOpenProjects] = useState(false)

    const popupList: {[key: string]: React.ReactNode} = {
        "forgot-password-popup": <PopupForgotPassword/>,
        "add-new-employee-popup": <PopupAddEmployee isOpenProjects={isOpenProjects} setIsOpenProjects={setIsOpenProjects} />,
        "edit-employee-popup": <PopupEditEmployee data={popup.data} isOpenProjects={isOpenProjects} setIsOpenProjects={setIsOpenProjects} />,
        "add-project-popup": <PopupAddProject/>,
        "remove-table-item-popup": <PopupDeleteEmployee data={popup.data} />
    }

    const setPopup: any = useContext(PopupContext)

    useEffect(() => {
        if(!popup.popup) return;

        setIsPopupActive(true)
    }, [popup.popup])

    useEffect(() => {
        if(isPopupActive) return;

        setTimeout(() => {
            setPopup("")
        }, 500)
    }, [isPopupActive])

    return (
        <IsPopupActiveContext.Provider value={setIsPopupActive}>
            <div className={"popup" + (isPopupActive ? " is-active" : "")} style={{display: "flex"}}>
                <div className="popup-wrapper">
                    <div className="add-project__bg popup-bg" onClick={_ => setIsPopupActive(false)} />

                    {popupList[popup.popup]}

                </div>
            </div>

            <div className="forgot-password-2 popup" id="thanks-popup" style={{display: "none"}}>
                <div className="forgot-password-2__wrapper popup-wrapper">
                    <div className="forgot-password-2__bg popup-bg popup-close"></div>
                    <div className="forgot-password-2__body popup-body">
                        <button type="button" className="forgot-password__close-btn popup-close-btn popup-close"
                                title="Close">
                            <svg width="15" height="15" viewBox="0 0 15 15">
                                <use xlinkHref="img/sprites.svg#close"></use>
                            </svg>
                        </button>
                        <div className="forgot-password-2__container popup-container" data-simplebar
                             data-simplebar-auto-hide="false">
                            <h2 className="forgot-password-2__title popup-title title is-center">
                                Thank you!
                            </h2>
                            <div className="forgot-password-2__text popup-text is-center">
                                We have sent the letter with instructions <br/> to the
                                e-mail: <u>o.rybak@ic-group.org</u>
                            </div>
                            <form className="popup-form">
                                <div className="popup-form__row-2">
                                    <button className="popup-form__submit btn popup-close" type="button">
                                        Continue
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            <div className="forgot-password popup" id="reset-password-popup" style={{display: "none"}}>
                <div className="forgot-password__wrapper popup-wrapper">
                    <div className="forgot-password__bg popup-bg popup-close"></div>
                    <div className="forgot-password__body popup-body">
                        <button type="button" className="forgot-password__close-btn popup-close-btn popup-close"
                                title="Close">
                            <svg width="15" height="15" viewBox="0 0 15 15">
                                <use xlinkHref="img/sprites.svg#close"></use>
                            </svg>
                        </button>
                        <div className="forgot-password__container popup-container" data-simplebar
                             data-simplebar-auto-hide="false">
                            <h2 className="forgot-password__title popup-title title is-center">
                                Reset the password?
                            </h2>
                            <div className="forgot-password__text popup-text is-center">
                                We will send instructions on how to do it <br/> to Olena Rybak.
                            </div>
                            <form className="popup-form">
                                <div className="popup-form__row is-min-gap">
                                    <button className="popup-form__cancel btn is-transparent popup-close" type="button">
                                        Cancel
                                    </button>
                                    <button className="popup-form__submit btn" type="submit">
                                        Reset password
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            <PopupEmployeeProjects isOpenProjects={isOpenProjects} setIsOpenProjects={setIsOpenProjects} />


        </IsPopupActiveContext.Provider>
    )
}
