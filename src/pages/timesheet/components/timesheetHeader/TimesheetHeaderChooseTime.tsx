import React, {useEffect, useState} from 'react'
import {useClickOutside} from "../../../../hooks/ClickOutside";
import {CustomSelect} from "../../../../components/customSelect/CustomSelect";
import {TimeHoursList} from "../../../../constants/TimeHoursList";
import {TimeMinutesList} from "../../../../constants/TimeMinutesList";
import { Translate } from '../../../../components/translate/Translate';
import {useTranslation} from "react-i18next";

interface ITimesheetHeaderChooseTimeProps {
    setHoursData: any
    setTimeData: any
    hoursData: number
    timeData: string
}

export const TimesheetHeaderChooseTime: React.FC<ITimesheetHeaderChooseTimeProps> = ({
                                                                                         setHoursData,
                                                                                         setTimeData,
                                                                                         hoursData,
                                                                                         timeData
                                                                                     }) => {

    const { t } = useTranslation();

    const [isChosenDate, setIsChosenDate] = useState(false)
    const [isLoad, setIsLoad] = useState(false)

    const [timeFromHours, setTimeFromHours] = useState(TimeHoursList()[7])
    const [timeFromMinutes, setTimeFromMinutes] = useState(TimeMinutesList()[0])
    const [timeToHours, setTimeToHours] = useState(TimeHoursList()[7])
    const [timeToMinutes, setTimeToMinutes] = useState(TimeMinutesList()[0])

    const [isActiveSelectTime, setIsActiveSelectTime] = useState(false)
    const {rootEl} = useClickOutside(setIsActiveSelectTime)

    const hoursAmount = timeFromHours.value > timeToHours.value ? 24 + (+timeToHours.value - +timeFromHours.value - (+timeFromMinutes.value - +timeToMinutes.value)) : (+timeToHours.value - +timeFromHours.value - (+timeFromMinutes.value - +timeToMinutes.value))

    const lessThenTen = (num: string | number) => +num < 10 ? "0" + num : num

    const handleTimeChange = (e: any) => {
        setIsChosenDate(true)
    }
    const handleHoursFromChange = (e: any) => {
        setIsChosenDate(true)
        setTimeToHours(TimeHoursList()[e.value])
    }

    useEffect(() => {
        setTimeData(`${lessThenTen(+timeFromHours.label)}:${lessThenTen(+timeFromMinutes.label)} – ${lessThenTen(+timeToHours.label)}:${lessThenTen(+timeToMinutes.label)}`)
        setHoursData(hoursAmount)
    }, [timeFromHours, timeFromMinutes, timeToHours, timeToMinutes])


    // EDIT POINT
    useEffect(() => {

        if (+hoursData === 0) return;
        setIsChosenDate(true)
        setTimeData(timeData)

        const hourFrom = timeData[0] + timeData[1]
        const minuteFrom = timeData[3] + timeData[4]
        const hourTo = timeData[8] + timeData[9]
        const minuteTo = timeData[11] + timeData[12]

        const minuteValue: any = {
            "30": 0.5,
            "00": 0
        }

        setTimeFromHours(
            {
                value: Number(hourFrom),
                label: hourFrom
            }
        )
        setTimeFromMinutes(
            {
                value: minuteValue[minuteFrom.toString()],
                label: minuteFrom
            }
        )
        setTimeToHours(
            {
                value: Number(hourTo),
                label: hourTo
            }
        )
        setTimeToMinutes(
            {
                value: minuteValue[minuteTo.toString()],
                label: minuteTo
            }
        )

    }, [timeData, hoursData])


    useEffect(() => {
        if (+timeData === 0) {
            setIsChosenDate(false)
            setTimeFromHours(TimeHoursList()[7])
            setTimeFromMinutes(TimeMinutesList()[0])
            setTimeToHours(TimeHoursList()[7])
            setTimeToMinutes(TimeMinutesList()[0])
            return;
        }
    }, [timeData])

    const handleAddTime = (additionalHours: number) => {
        if(!TimeHoursList()[timeToHours.value - 1 + additionalHours]) return;

        setTimeToHours(TimeHoursList()[timeFromHours.value - 1 + additionalHours])
    }

    const additionalHoursList = ["2", "4", "8"]

    return (
        <>
            <div ref={rootEl}
                 className={isActiveSelectTime ? "section-table__add-task--time section-table__time drop-down is-right-default is-active" : "section-table__add-task--time section-table__time drop-down is-right-default"}>
                <button onClick={_ => setIsActiveSelectTime(prev => !prev)}
                        className="section-table__time--target drop-down__target" type="button">
                    <span>
                        {isChosenDate ? `${timeFromHours.label}:${timeFromMinutes.label} – ${timeToHours.label}:${timeToMinutes.label}` : <Translate>timesheet_page.top_part.choose_time</Translate>}
                    </span>
                    <svg width="10" height="7" viewBox="0 0 10 7"
                         className="drop-down__target--arrow">
                        <use xlinkHref="#drop-down-arrow"></use>
                    </svg>
                </button>
                <div className="section-table__time--block drop-down__block">
                    <div className="section-table__time--item">
                        <div className="section-table__time--item-col">
                            <span><Translate>timesheet_page.popups.from</Translate>:</span>
                        </div>
                        <div className="section-table__time--item-col">
                            <div className="section-table__time--select">

                                <CustomSelect tabIndex={1} list={TimeHoursList()} onChange={handleHoursFromChange}
                                              defaultValue={timeFromHours} selectValue={timeFromHours}
                                              setSelectedItem={setTimeFromHours} scrollNumber={357}/>

                            </div>
                            <span>:</span>
                            <div className="section-table__time--select">

                                <CustomSelect tabIndex={2} list={TimeMinutesList()} onChange={handleTimeChange}
                                              defaultValue={timeFromMinutes} selectValue={timeFromMinutes}
                                              setSelectedItem={setTimeFromMinutes}/>

                            </div>
                        </div>
                    </div>

                    <ul className="section-table__time--item-additional">

                        {
                            additionalHoursList.map((hour: string) =>
                                <li key={hour}>
                                    <button type={"button"} onClick={_ => handleAddTime(+hour)}>
                                        {hour} <Translate>timesheet_page.table.h</Translate>
                                    </button>
                                </li>
                            )
                        }

                    </ul>

                    <div className="section-table__time--item">
                        <div className="section-table__time--item-col">
                            <span><Translate>timesheet_page.popups.to</Translate>:</span>
                        </div>
                        <div className="section-table__time--item-col">
                            <div className="section-table__time--select">

                                <CustomSelect tabIndex={3} list={TimeHoursList()} onChange={handleTimeChange}
                                              defaultValue={timeToHours} selectValue={timeToHours}
                                              setSelectedItem={setTimeToHours} scrollNumber={357}/>

                            </div>
                            <span>:</span>
                            <div className="section-table__time--select">
                                <CustomSelect tabIndex={4} list={TimeMinutesList()} onChange={handleTimeChange}
                                              defaultValue={timeToMinutes} selectValue={timeToMinutes}
                                              setSelectedItem={setTimeToMinutes}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="section-table__add-task--hours">
                <input type="text" readOnly name="hours" value={`${hoursAmount} ${t('timesheet_page.table.h')}`} placeholder="0 hours" required
                       className="input hours-input none-disabled-style" data-add-text="hours"/>
            </div>
        </>
    )
}
