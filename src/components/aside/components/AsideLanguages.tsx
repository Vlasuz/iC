import React, {useEffect, useState} from 'react'
import {useLanguage} from "../../../hooks/Language";
import {useClickOutside} from "../../../hooks/ClickOutside";

interface IAsideLanguagesProps {

}

export const AsideLanguages: React.FC<IAsideLanguagesProps> = () => {

    const {languages, handleSwitch, langSelected} = useLanguage()

    const [isOpenLanguages, setIsOpenLanguages] = useState(false)
    const {rootEl} = useClickOutside(setIsOpenLanguages)

    return (
        <div ref={rootEl} className="aside__change-on-min">
            <div>
                <div className={`aside__language drop-down is-dark is-bottom ${isOpenLanguages && "is-active"}`}>
                    <button onClick={_ => setIsOpenLanguages(prev => !prev)} className="aside__language--target drop-down__target" type="button">
                        <i>
                            <svg width="15" height="15" viewBox="0 0 15 15">
                                <use xlinkHref="#language"></use>
                            </svg>
                        </i>
                        <span>
                            {languages.filter(item => item.slug === langSelected)[0]?.titleBig}
                        </span>
                        <svg width="10" height="7" viewBox="0 0 10 7"
                             className="drop-down__target--arrow">
                            <use xlinkHref="#drop-down-arrow"></use>
                        </svg>
                    </button>
                    <div className="aside__language--block drop-down__block">
                        <ul className="drop-down__list">

                            {
                                languages?.filter(lang => lang.slug !== langSelected).map(lang =>
                                    <li key={lang.slug} onClick={_ => {
                                        handleSwitch(lang.slug)
                                        setIsOpenLanguages(false)
                                    }}>
                                        <a>
                                            {lang.titleBig}
                                        </a>
                                    </li>
                                )
                            }

                        </ul>
                    </div>
                </div>
            </div>
            <div>
                <div className="aside__language drop-down is-dark is-bottom is-min">
                    <button className="aside__language--target drop-down__target" type="button">
												<span>
													{languages.filter(item => item.slug === langSelected)[0]?.title}
												</span>
                        <svg width="10" height="7" viewBox="0 0 10 7"
                             className="drop-down__target--arrow">
                            <use xlinkHref="#drop-down-arrow"></use>
                        </svg>
                    </button>
                    <div className="aside__language--block drop-down__block">
                        <ul className="drop-down__list">
                            {
                                languages?.filter(lang => lang.slug !== langSelected).map(lang =>
                                    <li key={lang.slug} onClick={_ => {
                                        handleSwitch(lang.slug)
                                        setIsOpenLanguages(false)
                                    }}>
                                        <a>
                                            {lang.title}
                                        </a>
                                    </li>
                                )
                            }
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}
