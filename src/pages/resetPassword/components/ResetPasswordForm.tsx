import React, {useEffect, useState} from 'react'
import {Translate} from "../../../components/translate/Translate";
import {LoginChooseCompany} from "../../login/components/LoginChooseCompany";
import {LoginStyled} from "../../login/Login.styled";
import axios from "axios";
import {getApiLink} from "../../../functions/getApiLink";
import {NavLink, useParams} from "react-router-dom";

interface IResetPasswordFormProps {

}

export const ResetPasswordForm: React.FC<IResetPasswordFormProps> = () => {

    const {userCode, userEmail} = useParams()

    const [isSuccessChanges, setIsSuccessChanges] = useState(false)
    const [errorMessage, setErrorMessage] = useState<string>("")

    const handleReset = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setErrorMessage("")
        if (isShowPassword !== isShowPasswordRepeat) return;

        axios.post(getApiLink("/api/auth/reset_password_confirm/"), {
            "email": userEmail,
            "code": userCode,
            "password": passwordField
        }).then(({data}) => {
            console.log(data)
            if(data.status === true) {
                setIsSuccessChanges(true)
            } else if (data.status === false){
                setErrorMessage(data.message)
            }
        }).catch(er => {
            console.log(er)
            setErrorMessage("unknown")
        })
    }

    const errorCodes: any = {
        "invalid_code": "Invalid code",
        "unknown": "Unknown error",
    }

    const [isShowPassword, setIsShowPassword] = useState(false)
    const [isShowPasswordRepeat, setIsShowPasswordRepeat] = useState(false)

    const [passwordField, setPasswordField] = useState("")
    const [secondPasswordField, setSecondPasswordField] = useState("")

    return (
        <form onSubmit={handleReset} className="login__form">

            {isSuccessChanges ? <div className="reset-password__thanks">
                    <h1 className="login__title title is-large">
                        Thank you!
                    </h1>
                    <p>
                        Your password was successfully updated!
                    </p>
                    <NavLink to={"/login"} className={"login__submit btn"}>
                        Go to the entry page
                    </NavLink>
                </div> :
                <>
                    <h1 className="login__title title is-large">
                        Reset password
                    </h1>
                    <label className="login__label">
                <span className="input_placeholder">
                        <input type={isShowPassword ? "text" : "password"} name="password" required
                               onChange={e => setPasswordField(e.target.value)} value={passwordField}
                               className="login__input input password-input"/>
                    <span className="placeholder">
                        {!passwordField.length ? "Enter your new password" : ""}
                    </span>
                </span>
                        <button onClick={_ => setIsShowPassword(prev => !prev)}
                                className="login__show-password password-input__visible-toggle" type="button"
                                title="Show/Hide password">
                            <svg width="15" height="15" viewBox="0 0 15 15">
                                <use xlinkHref={isShowPassword ? "#password-viewed" : "#password-hidden"}/>
                            </svg>
                        </button>
                    </label>
                    <label className="login__label">
                <span className="input_placeholder">
                    <input type={isShowPasswordRepeat ? "text" : "password"} name="password" required
                           onChange={e => setSecondPasswordField(e.target.value)} value={secondPasswordField}
                           className="login__input input password-input"/>
                    <span className="placeholder">
                        {!secondPasswordField.length ? "Confirm your new password" : ""}
                    </span>
                </span>
                        <button onClick={_ => setIsShowPasswordRepeat(prev => !prev)}
                                className="login__show-password password-input__visible-toggle" type="button"
                                title="Show/Hide password">
                            <svg width="15" height="15" viewBox="0 0 15 15">
                                <use xlinkHref={isShowPasswordRepeat ? "#password-viewed" : "#password-hidden"}/>
                            </svg>
                        </button>
                    </label>

                    <div className="login__form-row">
                        <div></div>
                        <button className="login__submit btn" type="submit">
                            Save new password
                        </button>
                    </div>
                    <p className="error">
                        {errorCodes[errorMessage]}
                    </p>

                </>

            }


        </form>
    )
}
