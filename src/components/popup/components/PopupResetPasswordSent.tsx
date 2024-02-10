import React, {useContext, useEffect} from 'react'
import {IUser} from "../../../models";
import {useSelector} from "react-redux";
import {IsPopupActiveContext, IsPopupActiveSecondContext} from "../PopupList";
import {PopupClose} from "./PopupClose";
import {Translate} from "../../translate/Translate";

interface IPopupResetPasswordSentProps {
    data: any
    popup: any
}

export const PopupResetPasswordSent: React.FC<IPopupResetPasswordSentProps> = ({data, popup}) => {

    const userData: IUser = useSelector((state: any) => state.toolkit.user)

    const setIsPopupSecondClose: any = useContext(IsPopupActiveSecondContext)
    const isPopupActive: any = useContext(IsPopupActiveContext)

    return (
        <div className="forgot-password-2__body popup-body">
            <PopupClose/>
            <button type="button" onClick={_ => popup.secondPopup ? setIsPopupSecondClose(false) : isPopupActive(false)} className="remove-table-item__close-btn popup-close-btn popup-close"
                    title="Close">
                <svg width="15" height="15" viewBox="0 0 15 15">
                    <use xlinkHref="#close"></use>
                </svg>
            </button>
            <div className="forgot-password-2__container popup-container" data-simplebar
                 data-simplebar-auto-hide="false">
                <h2 className="forgot-password-2__title popup-title title is-center">
                    <Translate>reset_password.thank_you</Translate>
                </h2>
                <div className="forgot-password-2__text popup-text is-center">
                    <Translate>reset_password.instructions_sent_to_email</Translate> <u>{data?.email ?? userData?.email}</u>
                </div>
                <form className="popup-form">
                    <div className="popup-form__row-2">
                        <button onClick={_ => popup.secondPopup ? setIsPopupSecondClose(false) : isPopupActive(false)} className="popup-form__submit btn" type="button">
                            <Translate>reset_password.continue</Translate>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
