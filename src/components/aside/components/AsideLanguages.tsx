import React, {useEffect, useState} from 'react'

interface IAsideLanguagesProps {

}

export const AsideLanguages: React.FC<IAsideLanguagesProps> = () => {

    const languages = ['English', 'Ukrainian', 'Russian']

    const [activeLanguage, setActiveLanguage] = useState<string>(languages[0])

    const handeSwitch = (lang: string) => {
        setActiveLanguage(lang)
    }

    return (
        <div className="aside__change-on-min">
            <div>
                <div className="aside__language drop-down is-dark is-bottom">
                    <button className="aside__language--target drop-down__target" type="button">
                        <i>
                            <svg width="15" height="15" viewBox="0 0 15 15">
                                <use xlinkHref="#language"></use>
                            </svg>
                        </i>
                        <span>
                            {activeLanguage}
                        </span>
                        <svg width="10" height="7" viewBox="0 0 10 7"
                             className="drop-down__target--arrow">
                            <use xlinkHref="#drop-down-arrow"></use>
                        </svg>
                    </button>
                    <div className="aside__language--block drop-down__block">
                        <ul className="drop-down__list">

                            {
                                languages.filter(lang => lang !== activeLanguage).map(lang =>
                                    <li key={lang} onClick={_ => handeSwitch(lang)}>
                                        <a href="#" aria-label={lang}>
                                            {lang}
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
													En
												</span>
                        <svg width="10" height="7" viewBox="0 0 10 7"
                             className="drop-down__target--arrow">
                            <use xlinkHref="#drop-down-arrow"></use>
                        </svg>
                    </button>
                    <div className="aside__language--block drop-down__block">
                        <ul className="drop-down__list">
                            <li>
                                <a href="#" aria-label="Ua">
                                    Ua
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}
