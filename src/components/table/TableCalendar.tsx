import React, {useEffect, useRef, useState} from 'react'
import DatePicker from "react-datepicker";
import {log} from "util";
import {useClickOutside} from "../../hooks/ClickOutside";

interface ITableCalendarProps {
    setDateData: any
    dateData: string
}

export const TableCalendar: React.FC<ITableCalendarProps> = ({setDateData, dateData}) => {

    const lessThenTen = (num: string) => +num < 10 ? "0" + num : num

    const handleSetDate = (e: any) => {
        const date = new Date(e)
        setDate(e)
        setDateData(`${lessThenTen(String(date.getDate()))}.${lessThenTen(String(date.getMonth() + 1))}.${date.getFullYear()}`)
    }

    const [date, setDate] = useState(new Date());

    useEffect(() => {
        setDateData(`${lessThenTen(String(date.getDate()))}.${lessThenTen(String(date.getMonth() + 1))}.${date.getFullYear()}`)
    }, [date])

    useEffect(() => {
        if (!dateData) return;

        const dateParts = dateData.split('.');
        const formattedDate = new Date(`${dateParts[1]}-${dateParts[0]}-${dateParts[2]}`);

        setDate(formattedDate)

    }, [dateData])

    const calendarBlock: any = useRef(null)

    const [calendarOpen, setCalendarOpen] = useState(false);

    const handleCalendarToggle = (status: any) => {

        if(status.type === "input") {
            setCalendarOpen(status.data);
            if(calendarOpen) {
                calendarBlock.current.input.closest('.section-table__add-task--set-date').classList.remove('is-active')
            } else {
                calendarBlock.current.input.closest('.section-table__add-task--set-date').classList.add('is-active')
            }
        } else if (status.type === "outside") {
            setCalendarOpen(status.data);
            calendarBlock.current.input.closest('.section-table__add-task--set-date').classList.remove('is-active')
        }
    };

    useEffect(() => {
        if(!calendarOpen) {
            calendarBlock.current.input.closest('.section-table__add-task--set-date').classList.remove('is-active')
        }
    }, [calendarOpen])

    const {rootEl} = useClickOutside(setCalendarOpen)

    return (
        <div className="section-table__add-task--set-date">


            <div className="input-date" ref={rootEl}>
                <DatePicker
                    ref={calendarBlock}
                    selected={date}
                    todayButton={"Today"}
                    className={"input date-input none-disabled-style"}
                    autoComplete={"off"}
                    required
                    readOnly
                    open={calendarOpen}
                    onInputClick={() => handleCalendarToggle({type: "input", data: !calendarOpen})}
                    onChange={handleSetDate}
                />
            </div>


            <svg width="10" height="7" viewBox="0 0 10 7">
                <use xlinkHref="#drop-down-arrow"></use>
            </svg>
        </div>
    )
}
