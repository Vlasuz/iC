import React, {useContext, useEffect} from 'react'
import {IsPopupActiveContext} from "../PopupList";

interface IPopupForgotPasswordProps {

}

export const PopupForgotPassword: React.FC<IPopupForgotPasswordProps> = () => {

    const setIsPopupActive: any = useContext(IsPopupActiveContext)

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
                    Forgot your password?
                </h2>
                <div className="forgot-password__text popup-text is-center">
                    Don’t worry, we will send you a new one! Just enter your e-mail below and check the
                    Inbox.
                </div>
                <form className="popup-form">
                    <div className="popup-form__row">
                        <label className="popup-form__label is-full">
                            <input type="email" name="Email" required placeholder="Enter  your e-mail"
                                   className="input"/>
                        </label>
                    </div>
                    <div className="popup-form__row is-min-gap">
                        <button className="popup-form__cancel btn is-transparent" onClick={_ => setIsPopupActive(false)}
                                type="button">
                            Cancel
                        </button>
                        <button className="popup-form__submit btn" type="submit">
                            Reset password
                        </button>
                    </div>
                </form>
            </div>

        </div>
    )
}
