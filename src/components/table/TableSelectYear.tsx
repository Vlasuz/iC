import React, {useEffect, useState} from 'react'
import {useClickOutside} from "../../hooks/ClickOutside";
import {Navigation} from "swiper";
import {Swiper, SwiperSlide} from "swiper/react";
import {SetTimesheet} from "../../api/SetTimesheet";
import { useDispatch } from 'react-redux';
import {Years} from "../../constants/Years";

interface ITableSelectYearProps {
    setYear?: any
}

export const TableSelectYear: React.FC<ITableSelectYearProps> = ({setYear}) => {

    const [isSelectActive, setIsSelectActive] = useState(false)
    const {rootEl} = useClickOutside(setIsSelectActive)

    const dateNow = new Date()
    const [fieldYear, setFieldYear] = useState(dateNow.getFullYear())

    const dispatch = useDispatch()

    useEffect(() => {
        setYear(fieldYear)
        SetTimesheet(dispatch, fieldYear)
    }, [fieldYear])

    return (
        <div ref={rootEl} className={`section-table__change-date drop-down ${isSelectActive && "is-active"}`}>
            <button onClick={_ => setIsSelectActive(prev => !prev)} className="section-table__change-date--target drop-down__target" type="button">
                {fieldYear}
                <svg width="10" height="7" viewBox="0 0 10 7"
                     className="section-table__change-date--target-arrow drop-down__target--arrow">
                    <use xlinkHref="#drop-down-arrow"></use>
                </svg>
            </button>
            <div className={`section-table__change-date--block drop-down__block ${isSelectActive && "is-active"}`}>
                <div className="section-table__change-date--slider splide">
                    <div className="splide__track">
                        <Swiper
                            slidesPerView={3}
                            navigation={{
                                nextEl: '.splide__arrow--next',
                                prevEl: '.splide__arrow--prev'
                            }}
                            modules={[Navigation]}
                        >

                            {
                                Years().map(year =>
                                    <SwiperSlide key={year.year}>
                                        <li className="splide__slide">
                                            <label>
                                                <input disabled={year.isDisabled} onChange={_ => setFieldYear(+year.year)} defaultValue={+year.year} checked={fieldYear === +year.year} type="radio" name="year"/>
                                                <span>
                                                    {year.year}
                                                </span>
                                            </label>
                                        </li>
                                    </SwiperSlide>
                                )
                            }

                        </Swiper>
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
