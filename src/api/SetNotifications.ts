import {getBearer} from "../functions/getBearer";
import axios from "axios";
import {getApiLink} from "../functions/getApiLink";
import { setNotifications } from "../storage/toolkit";

export const SetNotifications = (dispatch: any) => {
    getBearer("get")
    axios.get(getApiLink(`/api/user/notifications/`)).then(({data}) => {
        dispatch(setNotifications(data))
    })
}