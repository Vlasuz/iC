import {getBearer} from "../functions/getBearer";
import axios from "axios";
import {getApiLink} from "../functions/getApiLink";
import { setNotifications } from "../storage/toolkit";
import { GetAccessToken } from "./GetAccessToken";

export const SetNotifications = (dispatch: any) => {
    getBearer("get")
    axios.get(getApiLink(`/api/user/notifications/`)).then(({data}) => {
        dispatch(setNotifications(data))
    }).catch(er => {
        er?.response?.status === 401 && GetAccessToken(dispatch)
    })
}