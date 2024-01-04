import {getBearer} from "../functions/getBearer";
import axios from "axios";
import {getApiLink} from "../functions/getApiLink";
import {setChosenTimesheet, setTimesheet} from "../storage/toolkit";

export const SetTimesheet = (dispatch: any, year?: number) => {
    const date = new Date()

    year = year ?? date.getFullYear()

    getBearer("get")
    axios.get(getApiLink(`/api/timesheet/my/?year=${year}`)).then(({data}) => {
        dispatch(setTimesheet(data))
        dispatch(setChosenTimesheet(data[0]))
    })
}