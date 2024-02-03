import React, {useContext, useEffect} from 'react'
import {PopupCloseCancel} from "./PopupCloseCancel";
import {PopupClose} from "./PopupClose";
import { useSelector } from 'react-redux';
import {IUser} from "../../../models";
import {PopupContext} from "../../../App";
import axios from "axios";
import {getApiLink} from "../../../functions/getApiLink";
import {IsPopupActiveContext, IsPopupActiveSecondContext} from "../PopupList";
import {Translate} from "../../translate/Translate";

interface IPopupResetPasswordProps {
    data: any
    popup: any
}

export const PopupResetPassword: React.FC<IPopupResetPasswordProps> = ({data, popup}) => {

    const setPopup: any = useContext(PopupContext)

    const handleResetPassword = () => {
        setPopup({popup: popup.popup, secondPopup: "reset-password-input-popup", data: popup.data})
    }

    const setIsPopupSecondActive: any = useContext(IsPopupActiveSecondContext)

    const handleClose = () => {
        setIsPopupSecondActive(false)
    }

    return (
        <div className="forgot-password__body popup-body">
            <PopupClose/>
            <button type="button" onClick={handleClose} className="remove-table-item__close-btn popup-close-btn popup-close"
                    title="Close">
                <svg width="15" height="15" viewBox="0 0 15 15">
                    <use xlinkHref="#close"></use>
                </svg>
            </button>
            <div className="forgot-password__container popup-container" data-simplebar
                 data-simplebar-auto-hide="false">
                <h2 className="forgot-password__title popup-title title is-center">
                    <Translate>reset_password.reset_the_password</Translate>
                </h2>
                <div className="forgot-password__text popup-text is-center">
                    {/*<Translate>reset_password.instructions_sent_to_employee</Translate>*/}
                </div>
                <div className="popup-form">
                    <div className="popup-form__row is-min-gap">
                        <button type="button" onClick={handleClose} className="btn is-transparent">
                            <Translate>employees_admin.others.cancel</Translate>
                        </button>
                        <button onClick={handleResetPassword} className="popup-form__submit btn" type="submit">
                            <Translate>reset_password.reset_password</Translate>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
