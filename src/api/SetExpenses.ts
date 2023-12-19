import axios from "axios"
import { useDispatch } from "react-redux"
import { getApiLink } from "../functions/getApiLink"
import { getBearer } from "../functions/getBearer"
import { setExpenses } from "../storage/toolkit"

export const SetExpenses = (dispatch: any, timesheetId: string) => {

    if(!timesheetId) return;

    getBearer("get")
    axios.get(getApiLink(`/api/timesheet/expenses/?timesheet_id=${timesheetId}`)).then(({data}) => {
        dispatch(setExpenses(data))
    })
}