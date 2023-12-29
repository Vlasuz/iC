import {getBearer} from "../functions/getBearer";
import axios from "axios";
import {getApiLink} from "../functions/getApiLink";
import {setChosenTimesheet, setTimesheet} from "../storage/toolkit";

export const SetTimesheet = (dispatch: any) => {
    getBearer("get")
    axios.get(getApiLink("/api/timesheet/my/")).then(({data}) => {
        dispatch(setTimesheet(data))
        dispatch(setChosenTimesheet(data[0]))
    })
}