import React, {useEffect, useState} from 'react'
import {useClickOutside} from "../../../../hooks/ClickOutside";
import {CustomSelect} from "../../../../components/customSelect/CustomSelect";
import {TimeHoursList} from "../../../../constants/TimeHoursList";
import {TimeMinutesList} from "../../../../constants/TimeMinutesList";

interface ITimesheetHeaderChooseTimeProps {
    setHoursData: any
    setTimeData: any
    hoursData: number
    timeData: string
}

export const TimesheetHeaderChooseTime: React.FC<ITimesheetHeaderChooseTimeProps> = ({setHoursData, setTimeData, hoursData, timeData}) => {

    const [isChosenDate, setIsChosenDate] = useState(false)

    const [timeFromHours, setTimeFromHours] = useState(TimeHoursList()[7])
    const [timeFromMinutes, setTimeFromMinutes] = useState(TimeMinutesList()[0])
    const [timeToHours, setTimeToHours] = useState(TimeHoursList()[7])
    const [timeToMinutes, setTimeToMinutes] = useState(TimeMinutesList()[0])

    const [isActiveSelectTime, setIsActiveSelectTime] = useState(false)
    const {rootEl} = useClickOutside(setIsActiveSelectTime)

    const hoursAmount = +timeToHours.value !== +timeFromHours.value ? +timeToHours.value - +timeFromHours.value > 0 ? +timeToHours.value - +timeFromHours.value : +timeToHours.value - +timeFromHours.value + 24 : "0"

    const lessThenTen = (num: string | number) => +num < 10 ? "0" + num : num

    const handleTimeChange = (e: any) => {
        setIsChosenDate(true)
    }

    useEffect(() => {
        setTimeData(`${lessThenTen(timeFromHours.value)}:${lessThenTen(timeFromMinutes.value)} – ${lessThenTen(timeToHours.value)}:${lessThenTen(timeToMinutes.value)}`)
        setHoursData(hoursAmount)
    }, [timeFromHours, timeFromMinutes, timeToHours, timeToMinutes])


    // EDIT POINT
    useEffect(() => {
        console.log(timeData, hoursData)

        if(+hoursData === 0) return;
        setIsChosenDate(true)
        setTimeData(timeData)

        const hourFrom = timeData[0] + timeData[1]
        const minuteFrom = timeData[3] + timeData[4]
        const hourTo = timeData[8] + timeData[9]
        const minuteTo = timeData[11] + timeData[12]

        setTimeFromHours(
            {
                value: Number(hourFrom),
                label: hourFrom
            }
        )
        setTimeFromMinutes(
            {
                value: Number(minuteFrom),
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
                value: Number(minuteTo),
                label: minuteTo
            }
        )

    }, [timeData, hoursData])


    // РАЗОБРАТЬСЯ ТУТ!!!!
    // РАЗОБРАТЬСЯ ТУТ!!!!
    // РАЗОБРАТЬСЯ ТУТ!!!!
    // РАЗОБРАТЬСЯ ТУТ!!!!
    // РАЗОБРАТЬСЯ ТУТ!!!!
    // РАЗОБРАТЬСЯ ТУТ!!!!

    useEffect(() => {
        if(+timeData === 0) {
            setIsChosenDate(false)
            setTimeFromHours(TimeHoursList()[7])
            setTimeFromMinutes(TimeMinutesList()[0])
            setTimeToHours(TimeHoursList()[7])
            setTimeToMinutes(TimeMinutesList()[0])
            return;
        }
    }, [timeData])

    return (
        <>
            <div ref={rootEl}
                 className={isActiveSelectTime ? "section-table__add-task--time section-table__time drop-down is-right-default is-active" : "section-table__add-task--time section-table__time drop-down is-right-default"}>
                <button onClick={_ => setIsActiveSelectTime(prev => !prev)}
                        className="section-table__time--target drop-down__target" type="button">
                    <span>
                        {isChosenDate ? `${lessThenTen(timeFromHours.value)}:${lessThenTen(timeFromMinutes.value)} – ${lessThenTen(timeToHours.value)}:${lessThenTen(timeToMinutes.value)}` : "Choose time"}
                    </span>
                    <svg width="10" height="7" viewBox="0 0 10 7"
                         className="drop-down__target--arrow">
                        <use xlinkHref="#drop-down-arrow"></use>
                    </svg>
                </button>
                <div className="section-table__time--block drop-down__block">
                    <div className="section-table__time--item">
                        <div className="section-table__time--item-col">
                            <span>From:</span>
                        </div>
                        <div className="section-table__time--item-col">
                            <div className="section-table__time--select">

                                <CustomSelect list={TimeHoursList()} onChange={handleTimeChange} defaultValue={timeFromHours} selectValue={timeFromHours} setSelectedItem={setTimeFromHours} scrollNumber={357}/>

                            </div>
                            <span>:</span>
                            <div className="section-table__time--select">

                                <CustomSelect list={TimeMinutesList()} onChange={handleTimeChange} defaultValue={timeFromMinutes} selectValue={timeFromMinutes} setSelectedItem={setTimeFromMinutes}/>

                            </div>
                        </div>
                    </div>
                    <div className="section-table__time--item">
                        <div className="section-table__time--item-col">
                            <span>To:</span>
                        </div>
                        <div className="section-table__time--item-col">
                            <div className="section-table__time--select">

                                <CustomSelect list={TimeHoursList()} onChange={handleTimeChange} defaultValue={timeToHours} selectValue={timeToHours} setSelectedItem={setTimeToHours} scrollNumber={357}/>

                            </div>
                            <span>:</span>
                            <div className="section-table__time--select">
                                <CustomSelect list={TimeMinutesList()} onChange={handleTimeChange} defaultValue={timeToMinutes} selectValue={timeToMinutes} setSelectedItem={setTimeToMinutes}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="section-table__add-task--hours">
                <input type="text" readOnly name="hours" value={`${hoursAmount} hours`} placeholder="0 hours" required
                       className="input hours-input none-disabled-style" data-add-text="hours"/>
            </div>
        </>
    )
}