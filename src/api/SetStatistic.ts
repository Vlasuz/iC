import {useEffect} from "react";
import {getBearer} from "../functions/getBearer";
import axios from "axios";
import {getApiLink} from "../functions/getApiLink";
import {setTimesheetStatistic} from "../storage/toolkit";

export const SetStatistic = (dispatch: any, timesheetId: string) => {

    if(!timesheetId) return;

    getBearer('get')
    axios.get(getApiLink(`/api/timesheet/statistics/?timesheet_id=${timesheetId}`)).then(({data}) => {
        dispatch(setTimesheetStatistic(data))
    }).catch(er => console.log(getApiLink("/api/timesheet/statistics/?timesheet_id"), er))

}