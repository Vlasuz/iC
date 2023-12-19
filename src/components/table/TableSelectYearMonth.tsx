import React, {useEffect, useState} from 'react'
import {useClickOutside} from "../../hooks/ClickOutside";
import {MonthNumber} from "../../constants/MonthNumber";
import {useDispatch, useSelector } from 'react-redux';
import {ITimesheet} from "../../models";
import {setChosenTimesheet, setTasks} from "../../storage/toolkit";

interface ITableSelectYearMonthProps {
    setMonth?: any
    onSwitch?: any
}

export const TableSelectYearMonth: React.FC<ITableSelectYearMonthProps> = ({setMonth, onSwitch}) => {

    const [isSelectActive, setIsSelectActive] = useState(false)
    const {rootEl} = useClickOutside(setIsSelectActive)
    const chosenTimesheet: ITimesheet = useSelector((state: any) => state.toolkit.chosenTimesheet)
    const timesheet: ITimesheet[] = useSelector((state: any) => state.toolkit.timesheet)
    const dispatch = useDispatch()

    const dateNow = new Date()

    const [filedMonth, setFiledMonth] = useState((chosenTimesheet && Object.keys(chosenTimesheet)?.length) ? Number(`${chosenTimesheet?.date[3]}${chosenTimesheet?.date[4]}`) : dateNow?.getMonth() + 1)
    const [fieldYear, setFieldYear] = useState(dateNow.getFullYear())

    useEffect(() => {
        setMonth && setMonth(filedMonth)
    }, [filedMonth])

    const handleChooseMonth = (month: number) => {
        setFiledMonth(month)
        onSwitch(month)

        if(!timesheet.length) return;

        const selectedTimesheet = timesheet.filter(item => Number(`${item.date[3]}${item.date[4]}`) === month)[0]

        if(!Object.keys(selectedTimesheet).length) return;

        dispatch(setChosenTimesheet(selectedTimesheet))
    }


    const [isHaveMonth, setIsHaveMonth] = useState<string[]>([])
    useEffect(() => {
        timesheet.map(item => {
            setIsHaveMonth(prev => [...prev, `${item.date[3]}${item.date[4]}`])
        })
    }, [timesheet])

    return (
        <div ref={rootEl} className={isSelectActive ? "section-table__change-full-date drop-down is-active" : "section-table__change-full-date drop-down"}>
            <button
                className="section-table__change-full-date--target drop-down__target"
                type="button"
                onClick={_ => setIsSelectActive(prev => !prev)}
            >
                <span>{MonthNumber()[filedMonth]}, {fieldYear}</span>
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
                                <li key={item} className={!isHaveMonth.some(m => m === item) ? "is-disabled" : ""}>
                                    <label>
                                        <input type="radio" name="month" defaultValue={item} onChange={_ => handleChooseMonth(+item)} checked={+item === filedMonth}/>
                                        <span>{MonthNumber()[index + 1]}</span>
                                    </label>
                                </li>
                            )
                        }

                    </ul>
                </div>
                <div className="section-table__change-full-date--slider splide">
                    <div className="splide__track">
                        <ul className="splide__list">
                            <li className="splide__slide">
                                <label>
                                    <input onChange={_ => setFieldYear(2021)} defaultValue={2021} checked={fieldYear === 2021} type="radio" name="year"/>
                                    <span>2021</span>
                                </label>
                            </li>
                            <li className="splide__slide">
                                <label>
                                    <input onChange={_ => setFieldYear(2022)} defaultValue={2022} checked={fieldYear === 2022} type="radio" name="year"/>
                                    <span>2022</span>
                                </label>
                            </li>
                            <li className="splide__slide">
                                <label>
                                    <input onChange={_ => setFieldYear(2023)} defaultValue={2023} checked={fieldYear === 2023} type="radio" name="year"/>
                                    <span>2023</span>
                                </label>
                            </li>
                            <li className="splide__slide is-disabled">
                                <label>
                                    <input onChange={_ => setFieldYear(2024)} defaultValue={2024} checked={fieldYear === 2024} type="radio" name="year"
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
