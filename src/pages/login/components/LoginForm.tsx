import React, {FormEvent, useContext, useRef, useState} from 'react'
import axios from "axios";
import {getApiLink} from "../../../functions/getApiLink";
import {useNavigate} from "react-router-dom";
import {useDispatch} from 'react-redux';
import {resetState, setAccessToken, setRefreshToken, setUser} from "../../../storage/toolkit";
import {LoginStyled} from "../Login.styled";
import setCookie from "../../../functions/setCookie";
import {PopupContext} from "../../../App";
import {LoginChooseCompany} from "./LoginChooseCompany";
import {Translate} from "../../../components/translate/Translate";
import {useTranslation} from "react-i18next";

interface ILoginFormProps {

}

interface ICodes {
    [key: string]: string
}

export const LoginForm: React.FC<ILoginFormProps> = () => {

    const [emailField, setEmailField] = useState<string>('');
    const [passwordField, setPasswordField] = useState<string>('')
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [errorMessage, setErrorMessage] = useState<string>('')
    const [isStayLoggedIn, setIsStayLoggedIn] = useState<boolean>(false)
    const [isShowPassword, setIsShowPassword] = useState(false)

    const errorCodes: ICodes = {
        "incorrect_username_or_password": "Incorrect email or password",
        "user_not_found": "No such user was found",
    }

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleAuthorization = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setIsLoading(true)
        setErrorMessage('')
        dispatch(resetState())

        axios.post(getApiLink('/api/auth/sign_in/'), {
            "email": emailField.toLowerCase(),
            "password": passwordField
        }).then(({data}) => {
            setIsLoading(false)
            if (data?.status !== undefined) return setErrorMessage(data.message)

            setCookie("access_token_ic", data.access_token, isStayLoggedIn ? undefined : 86400)
            setCookie("refresh_token_ic", data.refresh_token, isStayLoggedIn ? undefined : 86400)

            dispatch(setUser(data.user))
            dispatch(setAccessToken(data.access_token))
            dispatch(setRefreshToken(data.refresh_token))
            navigate('/')

        }).catch(er => {
            console.log(getApiLink('/api/auth/sign_in/'), er)
            setIsLoading(false)
            setErrorMessage(er.response?.data?.detail)
        })
    }

    const setPopup: any = useContext(PopupContext)


    const inputRef = useRef(null);
    const [isAutofill, setIsAutofill] = useState(false)

    // useEffect(() => {
    //     if (inputRef.current) {
    //         // @ts-ignore
    //         const isAutofilled = inputRef.current.value !== '';
    //         // Делайте что-то, когда поле автозаполнено или изменено
    //
    //         setIsAutofill(isAutofilled)
    //         console.log(isAutofilled)
    //     }
    // }, []);

    const handleInputChange = (event: any) => {
        setTimeout(() => {
            const isAutofilled = event.target.value !== '';
            setIsAutofill(isAutofilled)
            console.log(isAutofilled)
        }, 100);
    };

    const { t } = useTranslation();

    return (
        <LoginStyled onSubmit={handleAuthorization} className="login__form">
            <h1 className="login__title title is-large">
                <Translate>page_login.login</Translate>
            </h1>

            <LoginChooseCompany/>

            <label className="login__label">
                <input type="email" name="email" placeholder="E-mail" required
                       onChange={e => setEmailField(e.target.value)} value={emailField} className="login__input input"/>
            </label>

            <label className="login__label">
                    <input ref={inputRef} onInput={handleInputChange} type={isShowPassword ? "text" : "password"} name="password" required
                           onChange={e => setPasswordField(e.target.value)} value={passwordField}
                           className="login__input input password-input"
                           placeholder={`${t("page_login.password")}`}
                    />
                <button onClick={_ => setIsShowPassword(prev => !prev)}
                        className="login__show-password password-input__visible-toggle" type="button"
                        title="Show/Hide password">
                    <svg width="15" height="15" viewBox="0 0 15 15">
                        <use xlinkHref={isShowPassword ? "#password-viewed" : "#password-hidden"}/>
                    </svg>
                </button>
            </label>

            <div className="login__checkbox">
                <label className="checkbox">
                    <input onChange={e => setIsStayLoggedIn(e.target.checked)} checked={isStayLoggedIn}
                           type="checkbox"
                           name="stay-logged-in" className="checkbox__input"/>
                    <span className="checkbox__element">
                        <svg width="11" height="8" viewBox="0 0 11 8">
                            <use xlinkHref="#check"></use>
                        </svg>
                    </span>
                    <span className="checkbox__text">
                        <Translate>page_login.stay_log</Translate>
                    </span>
                </label>
            </div>
            <div className="login__form-row">
                <button disabled={isLoading} className="login__submit btn" type="submit">
                    <Translate>page_login.log_in</Translate>
                    <svg width="15" height="15" viewBox="0 0 15 15">
                        <use xlinkHref="#login"></use>
                    </svg>
                </button>
                <a onClick={_ => setPopup({popup: "forgot-password-popup"})}
                   className="login__button btn is-transparent is-grey open-popup">
                    <Translate>page_login.forgot</Translate>
                </a>
            </div>
            <p className="error">
                {errorCodes[errorMessage]}
            </p>
        </LoginStyled>
    )
}
