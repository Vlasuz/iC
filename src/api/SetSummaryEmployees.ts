import {getBearer} from "../functions/getBearer";
import axios from "axios";
import {getApiLink} from "../functions/getApiLink";
import { setSummaryEmployees } from "../storage/toolkit";
import { GetAccessToken } from "./GetAccessToken";

export const SetSummaryEmployees = (dispatch: any, month?: number, year?: number, projectId?: string) => {
    const date = new Date()

    console.log(year)

    month = month ?? date.getMonth()+1
    year = year ?? date.getFullYear()
    projectId = projectId ?? ""

    getBearer('get')
    axios.get(getApiLink(`/api/timesheet/employees/?month=${month}&year=${year}${projectId && "&project_id=" + projectId}`)).then(({data}) => {
        console.log(getApiLink(`/api/timesheet/employees/?month=${month}&year=${year}${projectId && "&project_id=" + projectId}`), data)
        dispatch(setSummaryEmployees(data))
    }).catch(er => {
        er?.response?.status === 401 && GetAccessToken(dispatch)
    })
}