import {getBearer} from "../functions/getBearer";
import axios from "axios";
import {IAllUserProjects} from "../models";
import {getApiLink} from "../functions/getApiLink";
import {GetAccessToken} from "./GetAccessToken";
import {setAllUserProjects} from "../storage/toolkit";

export async function SetAllUserProjects(dispatch: any) {
    getBearer("get")
    await axios.get<IAllUserProjects>(getApiLink('/api/user/projects_info/')).then(({data}) => {
        dispatch(setAllUserProjects(data))
    }).catch(er => {
        er?.response?.status === 401 && GetAccessToken(dispatch, SetAllUserProjects)
    })
}