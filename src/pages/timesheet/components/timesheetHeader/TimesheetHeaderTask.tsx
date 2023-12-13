import React, {useEffect, useState} from 'react'

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
                <input type="text" onChange={handleChangeInput} value={valueField} name="task" required placeholder="Tell us your secrets - what did you do?" className="input"/>
            </label>
        </div>
    )
}
