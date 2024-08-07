import React, {useEffect, useState} from 'react'
import {useClickOutside} from "../../hooks/ClickOutside";
import {MonthNumber} from "../../constants/MonthNumber";
import {useDispatch, useSelector } from 'react-redux';
import {ITimesheet} from "../../models";
import {setChosenTimesheet, setExpenses, setTasks} from "../../storage/toolkit";
import SwiperCore, {Navigation} from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import {SetTimesheet} from "../../api/SetTimesheet";
import {Years} from "../../constants/Years";
import {useParams} from "react-router-dom";
import axios from "axios";
import {getApiLink} from "../../functions/getApiLink";

SwiperCore.use([Navigation]);

interface ITableSelectYearMonthProps {
    setMonth?: any
    onSwitch?: any
    setYear?: any
    handleSetNewData?: any
}

export const TableSelectYearMonth: React.FC<ITableSelectYearMonthProps> = ({setMonth, setYear, onSwitch, handleSetNewData}) => {

    const [isSelectActive, setIsSelectActive] = useState(false)
    const {rootEl} = useClickOutside(setIsSelectActive)
    const chosenTimesheet: ITimesheet = useSelector((state: any) => state.toolkit.chosenTimesheet)
    const timesheet: ITimesheet[] = useSelector((state: any) => state.toolkit.timesheet)
    const dispatch = useDispatch()

    const {timesheetId}: any = useParams()

    const dateNow = new Date()

    const [filedMonth, setFiledMonth] = useState((chosenTimesheet && Object.keys(chosenTimesheet)?.length) ? Number(`${chosenTimesheet?.date[3]}${chosenTimesheet?.date[4]}`) : dateNow?.getMonth() + 1)
    const [fieldYear, setFieldYear] = useState(dateNow.getFullYear())

    const handleChooseMonth = (month: number) => {
        setFiledMonth(month)

        if(onSwitch !== undefined) {
            onSwitch(month)
        }

        if(timesheetId) {

            axios.get(getApiLink(`/api/timesheet/tasks/?month=${month}&year=${fieldYear}&user_id=${chosenTimesheet?.user?.id}`)).then(({data}) => {
                dispatch(setTasks(data))
            })
            axios.get(getApiLink(`/api/timesheet/expenses/?month=${month}&year=${fieldYear}&user_id=${chosenTimesheet?.user?.id}`)).then(({data}) => {
                dispatch(setExpenses(data))
            })

            return;
        }

        if(setMonth !== undefined) {
            setMonth(month)
        }

        if(!timesheet.length) return;

        const selectedTimesheet = timesheet.filter(item => Number(`${item.date[3]}${item.date[4]}`) === month)[0]

        if(selectedTimesheet && !Object.keys(selectedTimesheet).length) return;

        dispatch(setChosenTimesheet(selectedTimesheet))

        handleSetNewData && handleSetNewData()

        setIsSelectActive(false)
    }


    const [isHaveMonth, setIsHaveMonth] = useState<string[]>([])
    useEffect(() => {
        setIsHaveMonth([])
        timesheet.map(item => {
            setIsHaveMonth(prev => [...prev, `${item.date[3]}${item.date[4]}`])
        })
    }, [timesheet])

    const handleChangeYear = (year: number) => {
        setFieldYear(year)

        if(timesheetId !== undefined) return;

        if(setYear !== undefined) {
            setYear(year)
        }

        SetTimesheet(dispatch, year)
    }

    useEffect(() => {
        setMonth && setMonth(filedMonth)
    }, [])

    return (
        <div ref={rootEl} className={isSelectActive ? "section-table__change-full-date drop-down is-active" : "section-table__change-full-date drop-down"}>
            <button
                className="section-table__change-full-date--target drop-down__target"
                type="button"
                onClick={_ => setIsSelectActive(prev => !prev)}
            >
                <span>{MonthNumber()[filedMonth].translate}, {fieldYear}</span>
                <svg width="10" height="7" viewBox="0 0 10 7"
                     className="section-table__change-full-date--target-arrow drop-down__target--arrow">
                    <use xlinkHref="#drop-down-arrow"></use>
                </svg>
            </button>
            <div className="section-table__change-full-date--block drop-down__block">
                <div className="section-table__change-full-date--months">
                    <ul>

                        {
                            Object.keys(MonthNumber()).map((item, index) =>
                                <li key={item} className={!isHaveMonth.some(m => +m === +item) ? "is-disabled" : ""}>
                                    <label>
                                        <input type="radio" name="month" defaultValue={item} onChange={_ => handleChooseMonth(+item)} checked={+item === filedMonth}/>
                                        <span>{MonthNumber()[index + 1].translate}</span>
                                    </label>
                                </li>
                            )
                        }

                    </ul>
                </div>
                <div className="section-table__change-full-date--slider splide">
                    <div className="splide__track">

                        <Swiper
                            slidesPerView={3}
                            navigation={{
                                nextEl: '.splide__arrow--next',
                                prevEl: '.splide__arrow--prev'
                            }}
                            modules={[Navigation]}
                            initialSlide={1}
                        >

                            {
                                Years().map(year =>
                                    <SwiperSlide key={year.year}>
                                        <li className="splide__slide">
                                            <label>
                                                <input disabled={year.isDisabled} onChange={_ => handleChangeYear(+year.year)} defaultValue={+year.year} checked={fieldYear === +year.year} type="radio" name="year"/>
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