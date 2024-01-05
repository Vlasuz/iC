import {IUser} from "../models";
import axios from "axios";
import {getBearer} from "../functions/getBearer";
import {getApiLink} from "../functions/getApiLink";
import {SetSummaryEmployees} from "./SetSummaryEmployees";
import { GetAccessToken } from "./GetAccessToken";

export const SetFavoriteEmployee = (dispatch: any, userId: string) => {
    getBearer("post")
    axios.post(getApiLink(`/api/timesheet/employees/favourite/?user_id=${userId}`)).then(({data}) => {
        SetSummaryEmployees(dispatch)
    }).catch(er => {
        er?.response?.status === 401 && GetAccessToken(dispatch)
    })
}