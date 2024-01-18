import {getBearer} from "../functions/getBearer";
import axios from "axios";
import {getApiLink} from "../functions/getApiLink";
import {setTasks} from "../storage/toolkit";
import { GetAccessToken } from "./GetAccessToken";

export const SetTasks = async (dispatch: any, timesheetId: string) => {

    if(!timesheetId) return;

    getBearer("get")
    await axios.get(getApiLink(`/api/timesheet/tasks/?timesheet_id=${timesheetId}`)).then(({data}) => {
        dispatch(setTasks(data))
    }).catch(er => {
        er?.response?.status === 401 && GetAccessToken(dispatch)
    })
}