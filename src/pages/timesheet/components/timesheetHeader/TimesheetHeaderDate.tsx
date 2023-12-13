import React, {useEffect, useState} from 'react'
import DatePicker from "react-datepicker";

interface ITimesheetHeaderDateProps {
    setDateData: any
    dateData: string
}

export const TimesheetHeaderDate: React.FC<ITimesheetHeaderDateProps> = ({setDateData, dateData}) => {

    const lessThenTen = (num: string) =>  +num < 10 ? "0" + num : num

    const handleSetDate = (e: any) => {
        const date = new Date(e)
        setDate(e)
        setDateData(`${lessThenTen(String(date.getDate()))}.${lessThenTen(String(date.getMonth() + 1))}.${date.getFullYear()}`)

        console.log(`${lessThenTen(String(date.getDate()))}.${lessThenTen(String(date.getMonth() + 1))}.${date.getFullYear()}`)
    }

    const [date, setDate] = useState(new Date());

    console.log(date)

    useEffect(() => {
        if(!dateData) return;

        const dateParts = dateData.split('.');
        const formattedDate = new Date(`${dateParts[1]}-${dateParts[0]}-${dateParts[2]}`);

        setDate(formattedDate)

    }, [dateData])

    return (
        <div className="section-table__add-task--set-date">
            {/*<input type="text" name="date" placeholder="Set date" autoComplete="off"*/}
            {/*       readOnly className="input date-input none-disabled-style" required*/}
            {/*       data-prev-arrow-path="img/sprites.svg#arrow-prev"*/}
            {/*       data-next-arrow-path="img/sprites.svg#arrow-next"/>*/}

            <DatePicker selected={date} className={"input date-input none-disabled-style"} autoComplete={"off"} required onChange={handleSetDate} />

            <svg width="10" height="7" viewBox="0 0 10 7">
                <use xlinkHref="#drop-down-arrow"></use>
            </svg>
        </div>
    )
}
