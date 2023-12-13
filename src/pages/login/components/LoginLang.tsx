import React, {useEffect, useState} from 'react'
import { useSelector } from 'react-redux';
import {useClickOutside} from "../../../hooks/ClickOutside";
import {useLanguage} from "../../../hooks/Language";

interface ILoginLangProps {

}

export const LoginLang: React.FC<ILoginLangProps> = () => {

    const [isSelectOpen, setIsSelectOpen] = useState(false)
    const {rootEl} = useClickOutside(setIsSelectOpen)

    const {languages, handleSwitch, langSelected} = useLanguage()

    const language = useSelector((state: any) => state.toolkit.language)

    return (
        <div ref={rootEl} className={"login__lang drop-down is-right-default" + (isSelectOpen ? " is-active" : "")}>
            <button onClick={_ => setIsSelectOpen(prev => !prev)} className="login__lang--target drop-down__target" type="button">
                <span>
                    {languages.filter(item => item.slug === langSelected)[0]?.title}
                </span>
                <svg width="10" height="7" viewBox="0 0 10 7"
                     className="login__lang--target-arrow drop-down__target--arrow">
                    <use xlinkHref="#drop-down-arrow"></use>
                </svg>
            </button>
            <div className="login__lang--block drop-down__block">
                <ul className="login__lang--list drop-down__list">

                    {
                        languages?.filter(item => item.slug !== langSelected).map(lang =>
                            <li>
                                <a href="#" onClick={e => handleSwitch(lang.slug)}>
                                    {lang.title}
                                </a>
                            </li>
                        )
                    }

                </ul>
            </div>
        </div>
    )
}
