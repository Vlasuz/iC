import React, {useContext, useEffect} from 'react'
import { useSelector } from 'react-redux'
import {IUser} from "../../../models";
import {PopupClose} from "./PopupClose";
import {IsPopupActiveContext, IsPopupActiveSecondContext} from "../PopupList";

interface IPopupForgotPasswordThankYouProps {
    popup: any
    data: any
}

export const PopupResetPasswordThankYou: React.FC<IPopupForgotPasswordThankYouProps> = ({popup, data}) => {

    const userData: IUser = useSelector((state: any) => state.toolkit.user)

    const setIsPopupSecondClose: any = useContext(IsPopupActiveSecondContext)

    return (
        <div className="forgot-password-2__body popup-body">
            <PopupClose/>
            <div className="forgot-password-2__container popup-container" data-simplebar
                 data-simplebar-auto-hide="false">
                <h2 className="forgot-password-2__title popup-title title is-center">
                    Thank you!
                </h2>
                <div className="forgot-password-2__text popup-text is-center">
                    We have sent the letter with instructions <br/> to the
                    e-mail: <u>{data?.email ?? userData?.email}</u>
                </div>
                <form className="popup-form">
                    <div className="popup-form__row-2">
                        <button onClick={_ => setIsPopupSecondClose(false)} className="popup-form__submit btn" type="button">
                            Continue
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
