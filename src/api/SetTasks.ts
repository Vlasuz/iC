import {getBearer} from "../functions/getBearer";
import axios from "axios";
import {getApiLink} from "../functions/getApiLink";
import {setTasks} from "../storage/toolkit";
import { GetAccessToken } from "./GetAccessToken";

export const SetTasks = (dispatch: any, timesheetId: string) => {

    console.log(timesheetId)

    if(!timesheetId) return;

    getBearer("get")
    axios.get(getApiLink(`/api/timesheet/tasks/?timesheet_id=${timesheetId}`)).then(({data}) => {
        console.log(data)
        dispatch(setTasks(data))
    }).catch(er => {
        er?.response?.status === 401 && GetAccessToken(dispatch)
    })
}