import React, {useEffect, useState} from 'react'
import {Translate} from "../../../../components/translate/Translate";

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

    return (
        <div className="section-table__add-task--text">
            <label>
                <span className="input_placeholder">
                    <input type="text" onChange={handleChangeInput} value={valueField} name="task" required className="input"/>
                    <span className="placeholder">
                        <Translate>timesheet_page.top_part.tell_us_your_secrets</Translate>
                    </span>
                </span>
            </label>
        </div>
    )
}
