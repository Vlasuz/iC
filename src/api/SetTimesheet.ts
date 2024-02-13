import {getBearer} from "../functions/getBearer";
import axios from "axios";
import {getApiLink} from "../functions/getApiLink";
import {setChosenTimesheet, setTimesheet} from "../storage/toolkit";
import { GetAccessToken } from "./GetAccessToken";
import {SetTasks} from "./SetTasks";

export const SetTimesheet = (dispatch: any, year?: number) => {
    const date = new Date()

    year = year ?? date.getFullYear()

    getBearer("get")
    axios.get(getApiLink(`/api/timesheet/my/?year=${year}`)).then(({data}) => {
        dispatch(setTimesheet(data))
        dispatch(setChosenTimesheet(data[0]))
    }).catch(er => {
        er?.response?.status === 401 && GetAccessToken(dispatch, SetTasks)
    })
}