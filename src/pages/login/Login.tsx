import React, {useContext, useEffect} from 'react'

import login_decor_avif from './../../assets/html/img/login/login-decor-1.avif'
import login_decor_webp from './../../assets/html/img/login/login-decor-1.webp'
import login_decor_png from './../../assets/html/img/login/login-decor-1.png'

import logo_avif from './../../assets/html/img/logo.avif'
import logo_webp from './../../assets/html/img/logo.webp'
import logo_png from './../../assets/html/img/logo.png'

import {LoginForm} from "./components/LoginForm";
import {LoginLang} from "./components/LoginLang";

interface ILoginProps {

}

export const Login: React.FC<ILoginProps> = () => {

    return (
        <section className="login">
            <div className="login__wrapper">
                <div className="login__col">
                    <div className="login__header">
                        <div className="login__logo">
                            <picture>
                                <source srcSet={logo_avif} type="image/avif"/>
                                <source srcSet={logo_webp} type="image/webp"/>
                                <img src={logo_png} alt="" width="100" height="100" loading="lazy"/>
                            </picture>
                        </div>

                        <LoginLang/>

                    </div>
                    <div className="login__main">
                        <LoginForm/>
                    </div>
                    <div className="login__footer">
                        <ul className="login__privacy">
                            <li>
                                <a href="https://ic-consulenten.com.ua/about-ic/legal-notice/" target={"_blank"}>
                                    Legal notice
                                </a>
                            </li>
                            <li>
                                <a href="https://ic-consulenten.com.ua/about-ic/policy-statement/" target={"_blank"}>
                                    Compliance policy
                                </a>
                            </li>
                        </ul>
                        <div className="login__copyright">
                            Copyright © iC consulenten 2013 — 2023. All rights reserved.
                        </div>
                    </div>
                </div>
                <div className="login__col">
                    <div className="login__image">
                        <picture>
                            <source srcSet={login_decor_avif} type="image/avif"/>
                            <source srcSet={login_decor_webp} type="image/webp"/>
                            <img src={login_decor_png} alt="" width="0" height="0"/>
                        </picture>
                    </div>
                </div>
            </div>
        </section>
    )
}