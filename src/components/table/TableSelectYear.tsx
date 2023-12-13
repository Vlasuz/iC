import React, {useEffect, useState} from 'react'
import {useClickOutside} from "../../hooks/ClickOutside";

interface ITableSelectYearProps {

}

export const TableSelectYear: React.FC<ITableSelectYearProps> = () => {

    const [isSelectActive, setIsSelectActive] = useState(false)
    const {rootEl} = useClickOutside(setIsSelectActive)

    return (
        <div ref={rootEl} className={`section-table__change-date drop-down ${isSelectActive && "is-active"}`}>
            <button onClick={_ => setIsSelectActive(prev => !prev)} className="section-table__change-date--target drop-down__target" type="button">
                2023
                <svg width="10" height="7" viewBox="0 0 10 7"
                     className="section-table__change-date--target-arrow drop-down__target--arrow">
                    <use xlinkHref="#drop-down-arrow"></use>
                </svg>
            </button>
            <div className={`section-table__change-date--block drop-down__block ${isSelectActive && "is-active"}`}>
                <div className="section-table__change-date--slider splide">
                    <div className="splide__track">
                        <ul className="splide__list">
                            <li className="splide__slide">
                                <label>
                                    <input type="radio" name="year" value="2021"/>
                                    <span>2021</span>
                                </label>
                            </li>
                            <li className="splide__slide">
                                <label>
                                    <input type="radio" name="year" value="2022"/>
                                    <span>2022</span>
                                </label>
                            </li>
                            <li className="splide__slide">
                                <label>
                                    <input type="radio" name="year" value="2023" checked readOnly />
                                    <span>2023</span>
                                </label>
                            </li>
                            <li className="splide__slide is-disabled">
                                <label>
                                    <input type="radio" name="year" value="2024" disabled/>
                                    <span>2024</span>
                                </label>
                            </li>
                        </ul>
                    </div>
                    <div className="splide__arrows">
                        <button className="splide__arrow splide__arrow--prev" type="button">
                            <svg width="7" height="10" viewBox="0 0 7 10">
                                <use xlinkHref="#arrow-prev"></use>
                            </svg>
                        </button>
                        <button className="splide__arrow splide__arrow--next" type="button">
                            <svg width="7" height="10" viewBox="0 0 7 10">
                                <use xlinkHref="#arrow-next"></use>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
