import axios from "axios"
import { useDispatch } from "react-redux"
import { getApiLink } from "../functions/getApiLink"
import { getBearer } from "../functions/getBearer"
import { setExpenses } from "../storage/toolkit"
import { GetAccessToken } from "./GetAccessToken"

export const SetExpenses = async (dispatch: any, timesheetId: string) => {

    if(!timesheetId) return;

    getBearer("get")
    await axios.get(getApiLink(`/api/timesheet/expenses/?timesheet_id=${timesheetId}`)).then(({data}) => {
        dispatch(setExpenses(data))
    }).catch(er => {
        er?.response?.status === 401 && GetAccessToken(dispatch, SetExpenses)
    })
}