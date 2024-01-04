import {getBearer} from "../functions/getBearer";
import axios from "axios";
import {getApiLink} from "../functions/getApiLink";
import {setTasks} from "../storage/toolkit";

export const SetTasks = (dispatch: any, timesheetId: string) => {

    console.log(timesheetId)

    if(!timesheetId) return;

    getBearer("get")
    axios.get(getApiLink(`/api/timesheet/tasks/?timesheet_id=${timesheetId}`)).then(({data}) => {
        console.log(data)
        dispatch(setTasks(data))
    })
}