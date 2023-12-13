import React, {useEffect, useState} from 'react'
import {useClickOutside} from "../../../../hooks/ClickOutside";

interface ITimesheetHeaderYearSortProps {

}

export const TimesheetHeaderYearSort: React.FC<ITimesheetHeaderYearSortProps> = () => {

    const [isSelectActive, setIsSelectActive] = useState(false)
    const {rootEl} = useClickOutside(setIsSelectActive)

    return (
        <div ref={rootEl} className={isSelectActive ? "section-table__change-full-date drop-down is-active" : "section-table__change-full-date drop-down"}>
            <button
                className="section-table__change-full-date--target drop-down__target"
                type="button"
                onClick={_ => setIsSelectActive(prev => !prev)}
            >
                <span>April, 2023</span>
                <svg width="10" height="7" viewBox="0 0 10 7"
                     className="section-table__change-full-date--target-arrow drop-down__target--arrow">
                    <use xlinkHref="#drop-down-arrow"></use>
                </svg>
            </button>
            <div className="section-table__change-full-date--block drop-down__block">
                <div className="section-table__change-full-date--months">
                    <ul>
                        <li>
                            <label>
                                <input type="radio" name="month" value="1"/>
                                <span>January</span>
                            </label>
                        </li>
                        <li>
                            <label>
                                <input type="radio" name="month" value="7"/>
                                <span>July</span>
                            </label>
                        </li>
                        <li>
                            <label>
                                <input type="radio" name="month" value="2"/>
                                <span>February</span>
                            </label>
                        </li>
                        <li>
                            <label>
                                <input type="radio" name="month" value="8"/>
                                <span>August</span>
                            </label>
                        </li>
                        <li>
                            <label>
                                <input type="radio" name="month" value="3"/>
                                <span>March</span>
                            </label>
                        </li>
                        <li>
                            <label>
                                <input type="radio" name="month" value="9"/>
                                <span>September</span>
                            </label>
                        </li>
                        <li>
                            <label>
                                <input type="radio" name="month" value="4"/>
                                <span>April</span>
                            </label>
                        </li>
                        <li>
                            <label>
                                <input type="radio" name="month" value="10"/>
                                <span>October</span>
                            </label>
                        </li>
                        <li>
                            <label>
                                <input type="radio" name="month" value="5"/>
                                <span>May</span>
                            </label>
                        </li>
                        <li>
                            <label>
                                <input type="radio" name="month" value="11"/>
                                <span>November</span>
                            </label>
                        </li>
                        <li>
                            <label>
                                <input type="radio" name="month" value="6"/>
                                <span>June</span>
                            </label>
                        </li>
                        <li>
                            <label>
                                <input type="radio" name="month" value="12"/>
                                <span>December</span>
                            </label>
                        </li>
                    </ul>
                </div>
                <div className="section-table__change-full-date--slider splide">
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
                                    <input type="radio" name="year" value="2023"/>
                                    <span>2023</span>
                                </label>
                            </li>
                            <li className="splide__slide is-disabled">
                                <label>
                                    <input type="radio" name="year" value="2024"
                                           disabled/>
                                    <span>2024</span>
                                </label>
                            </li>
                        </ul>
                    </div>
                    <div className="splide__arrows">
                        <button className="splide__arrow splide__arrow--prev"
                                type="button">
                            <svg width="7" height="10" viewBox="0 0 7 10">
                                <use xlinkHref="#arrow-prev"></use>
                            </svg>
                        </button>
                        <button className="splide__arrow splide__arrow--next"
                                type="button">
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
