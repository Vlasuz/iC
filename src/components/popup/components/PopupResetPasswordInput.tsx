import React, {useContext, useEffect, useState} from 'react'
import {PopupClose} from "./PopupClose";
import {Translate} from "../../translate/Translate";
import {IsPopupActiveSecondContext} from "../PopupList";
import {PopupContext} from "../../../App";
import {IUser} from "../../../models";
import {useSelector} from "react-redux";
import {useTranslation} from "react-i18next";
import axios from 'axios';
import { getApiLink } from '../../../functions/getApiLink';
import {getBearer} from "../../../functions/getBearer";
import {toast} from "react-toastify";

interface IPopupResetPasswordInputProps {
    data: any
    popup: any
}

export const PopupResetPasswordInput: React.FC<IPopupResetPasswordInputProps> = ({data, popup}) => {

    const setPopup: any = useContext(PopupContext)

    const userData: IUser = useSelector((state: any) => state.toolkit.user)

    const [password, setPassword] = useState<string>("")
    const [passwordRepeat, setPasswordRepeat] = useState<string>("")

    const handleResetPassword = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()


        if(passwordRepeat !== password) {
            return toast.error(`${t("page_login.not_the_same")}`);
        }

        if(password.length < 8 || passwordRepeat.length < 8) {
            return toast.error(`${t("pass_min")} ${password.length}`);
        }

        getBearer("patch")
        axios.patch(getApiLink(`/api/admin/employee/edit/password/?employee_id=${data.id}`), {
            "password": password
        }).then(({data}) => {
            console.log(data)
            if(!data.status) return;

            setPopup({popup: popup.popup, secondPopup: "reset-password-thanks-popup", data: popup.data})
        })
    }

    const setIsPopupSecondActive: any = useContext(IsPopupActiveSecondContext)
    const handleClose = () => {
        setIsPopupSecondActive(false)
    }

    const {t} = useTranslation()

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
                <form onSubmit={handleResetPassword} className="popup-form">
                    <h2 className="forgot-password__title popup-title title is-center">
                        <Translate>page_login.enter_new_pass</Translate>
                    </h2>
                    <div className="forgot-password__text popup-text is-center">
                        <label>
                            <input style={{width: '100%'}} required onChange={e => setPassword(e.target.value)} value={password} type="password" placeholder={`${t("page_login.new_password")}`} className={"input"}/>
                            <br/>
                            <br/>
                            <input style={{width: '100%'}} required onChange={e => setPasswordRepeat(e.target.value)} value={passwordRepeat} type="password" placeholder={`${t("page_login.new_password_repeat")}`} className={"input"}/>
                        </label>
                    </div>
                    <div className="popup-form__row is-min-gap">
                        <button type="button" onClick={handleClose} className="btn is-transparent">
                            <Translate>employees_admin.others.cancel</Translate>
                        </button>
                        <button className="popup-form__submit btn" type="submit">
                            <Translate>reset_password.save_new_password</Translate>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
