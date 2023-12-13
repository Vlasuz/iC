import React, {useContext, useEffect} from 'react'
import {PopupCloseCancel} from "./PopupCloseCancel";
import {PopupClose} from "./PopupClose";
import { useSelector } from 'react-redux';
import {IUser} from "../../../models";
import {PopupContext} from "../../../App";

interface IPopupResetPasswordProps {

}

export const PopupResetPassword: React.FC<IPopupResetPasswordProps> = () => {

    const setPopup: any = useContext(PopupContext)

    const handleResetPassword = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        setPopup({popup: "edit-profile-popup", secondPopup: "reset-password-thanks-popup"})
    }

    const userData: IUser = useSelector((state: any) => state.toolkit.user)

    return (
        <div className="forgot-password__body popup-body">
            <PopupClose/>
            <div className="forgot-password__container popup-container" data-simplebar
                 data-simplebar-auto-hide="false">
                <h2 className="forgot-password__title popup-title title is-center">
                    Reset the password?
                </h2>
                <div className="forgot-password__text popup-text is-center">
                    We will send instructions on how to do it <br/> to {userData.first_name} {userData.last_name}.
                </div>
                <form onSubmit={handleResetPassword} className="popup-form">
                    <div className="popup-form__row is-min-gap">
                        <PopupCloseCancel/>
                        <button className="popup-form__submit btn" type="submit">
                            Reset password
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
