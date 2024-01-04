import {getBearer} from "../functions/getBearer";
import axios from "axios";
import {getApiLink} from "../functions/getApiLink";
import {setEmployeesList} from "../storage/toolkit";

export const SetEmployees = (dispatch: any) => {
    getBearer("get")
    axios.get(getApiLink("/api/admin/employee/")).then(({data}) => {
        dispatch(setEmployeesList(data))
    }).catch(er => console.log(er))
}