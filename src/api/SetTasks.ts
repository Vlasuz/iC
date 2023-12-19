import {getBearer} from "../functions/getBearer";
import axios from "axios";
import {getApiLink} from "../functions/getApiLink";
import {setExpenses, setTasks} from "../storage/toolkit";

export const SetTasks = (dispatch: any, timesheetId: string) => {

    if(!timesheetId) return;

    getBearer("get")
    axios.get(getApiLink(`/api/timesheet/tasks/?timesheet_id=${timesheetId}`)).then(({data}) => {
        dispatch(setTasks(data))
    })
}