import React, {useEffect, useState} from 'react'
import {Translate} from "../../../../components/translate/Translate";
import {useTranslation} from "react-i18next";

interface ITimesheetHeaderTaskProps {
    setTaskData: any
    taskData: string
}

export const TimesheetHeaderTask: React.FC<ITimesheetHeaderTaskProps> = ({setTaskData, taskData}) => {

    const [valueField, setValueField] = useState("")

    const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValueField(e.target.value)
        setTaskData(e.target.value)
    }

    useEffect(() => {
        setValueField(taskData)
    }, [taskData])

    const {t} = useTranslation();

    return (
        <div className="section-table__add-task--text">
            <label>
                <input spellCheck type="text" onChange={handleChangeInput} value={valueField} name="task" required
                       className="input"
                       placeholder={`${t("timesheet_page.top_part.tell_us_your_secrets")}`}
                />
            </label>
        </div>
    )
}
