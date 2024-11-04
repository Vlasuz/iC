import React, {useEffect, useRef, useState} from 'react'
import DatePicker from "react-datepicker";
import { uk, enUS } from 'date-fns/locale';
import {useClickOutside} from "../../hooks/ClickOutside";
import {Translate} from "../translate/Translate";
import { useSelector } from 'react-redux';
import { startOfWeek } from 'date-fns';

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
        if (!dateData) return;

        // const dateParts = dateData.split('.');
        // const formattedDate = new Date(`${dateParts[1]}-${dateParts[0]}-${dateParts[2]}`);

        let dateParts = dateData.split('.');

        dateParts = dateParts.map((i, x) => x === 2 && i.length < 3 ? "20"+i : i)
        
        const day = dateParts[0]
        const month = dateParts[1]
        const year = dateParts[2]
        
        const formattedDate = new Date(+year, +month-1, +day)

        setDate(formattedDate)

        setCalendarOpen(false)

        setDateData(`${lessThenTen(String(formattedDate.getDate()))}.${lessThenTen(String(formattedDate.getMonth() + 1))}.${formattedDate.getFullYear()}`)

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

        document.querySelectorAll(".react-datepicker__day-name").forEach(item => {
            // @ts-ignore
            item.textContent = item.textContent.slice(0, 1)
        })
    }, [calendarOpen])

    const {rootEl} = useClickOutside(setCalendarOpen)

    const language: string = useSelector((state: any) => state.toolkit.language)

    const locale = language === "en" ? enUS : uk;


    // Добавляем опцию weekStartsOn для локали
    if (locale === enUS) {
        locale.options = { weekStartsOn: 1 };
    }

    return (
        <div className="section-table__add-task--set-date">


            <div className="input-date" ref={rootEl}>
                <DatePicker
                    ref={calendarBlock}
                    selected={date}
                    todayButton={<Translate>timesheet_page.popups.today</Translate>}
                    className={"input date-input none-disabled-style"}
                    autoComplete={"off"}
                    required
                    readOnly
                    open={calendarOpen}
                    onInputClick={() => handleCalendarToggle({type: "input", data: !calendarOpen})}
                    onChange={handleSetDate}
                    dateFormat="dd/MM/yyyy"
                    locale={locale}
                    startDate={startOfWeek(new Date(), { weekStartsOn: 1 })}
                />
            </div>


            <svg width="10" height="7" viewBox="0 0 10 7">
                <use xlinkHref="#drop-down-arrow"></use>
            </svg>
        </div>
    )
}
