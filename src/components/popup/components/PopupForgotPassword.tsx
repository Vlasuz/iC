import React, {useContext, useEffect, useState} from 'react'
import {IsPopupActiveContext} from "../PopupList";
import {Translate} from "../../translate/Translate";
import {PopupCloseCancel} from "./PopupCloseCancel";
import axios from "axios";
import {getApiLink} from "../../../functions/getApiLink";
import {PopupContext} from "../../../App";
import {toast} from "react-toastify";

interface IPopupForgotPasswordProps {
    popup: any
    data: any
}

export const PopupForgotPassword: React.FC<IPopupForgotPasswordProps> = ({popup, data}) => {

    const setIsPopupActive: any = useContext(IsPopupActiveContext)
    const setPopup: any = useContext(PopupContext)

    const [emailValue, setEmailValue] = useState("")

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        axios.post(getApiLink(`/api/auth/reset_password/?email=${emailValue}`)).then(({data}) => {
            if(!data.status) {
                toast.error(<Translate>{`${data.message}`}</Translate>)
                return;
            }

            setPopup({popup: "reset-password-thanks-popup", data: {email: emailValue}})
        })
    }

    return (

        <div className="popup-body">
            <button type="button" className="popup-close-btn" onClick={_ => setIsPopupActive(false)} title="Close">
                <svg width="15" height="15" viewBox="0 0 15 15">
                    <use xlinkHref="#close"></use>
                </svg>
            </button>

            <div className="forgot-password__container popup-container" data-simplebar
                 data-simplebar-auto-hide="false">
                <h2 className="forgot-password__title popup-title title is-center">
                    <Translate>reset_password.forgot_password</Translate>
                </h2>
                <div className="forgot-password__text popup-text is-center">
                    <Translate>reset_password.dont_worry_enter_email</Translate>
                </div>
                <form onSubmit={handleSubmit} className="popup-form">
                    <div className="popup-form__row">
                        <label className="popup-form__label is-full">
                            <span className="input_placeholder">
                                <input type="email" name="Email" required
                                       className="input" value={emailValue} onChange={e => setEmailValue(e.target.value)}/>
                                <span className="placeholder">
                                    {!emailValue && <Translate>reset_password.enter_email</Translate>}
                                </span>
                            </span>
                        </label>
                    </div>
                    <div className="popup-form__row is-min-gap">
                        <PopupCloseCancel/>
                        <button className="popup-form__submit btn" type="submit">
                            <Translate>reset_password.reset_password</Translate>
                        </button>
                    </div>
                </form>
            </div>

        </div>
    )
}
